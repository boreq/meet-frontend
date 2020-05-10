import { Component, Ref, Vue } from 'vue-property-decorator';
import AppWebcam from '@/components/AppWebcam.vue';
import AppVisualisation from '@/components/AppVisualisation.vue';
import { ApiService } from '@/services/ApiService';
import { IncomingMessage, IncomingMessageType, OutgoingMessage } from '@/dto/Message';
import {
    HelloMessage,
    JoinedMessage,
    NameChangedMessage,
    QuitMessage,
    ReceivedMessage,
    RemoteIceCandidateMessage,
    RemoteSessionDescriptionMessage, VisualisationStateMessage,
} from '@/dto/messages/received';
import {
    LocalIceCandidateMessage,
    LocalSessionDescriptionMessage,
    SentMessage,
    SetNameMessage,
    UpdateVisualisationStateMessage,
} from '@/dto/messages/sent';
import { Participant } from '@/model/Participant';
import { WebRTCCancer } from '@/webrtc/WebRTCCancer';
import { VisualisationParticipant } from '@/components/AppVisualisation';
import { VisualisationState } from '@/visualisation/VisualisationState';

@Component({
    components: {
        AppWebcam,
        AppVisualisation,
    },
})
export default class Meet extends Vue {

    private localParticipantUUID: string;
    private participants = new Map<string, Participant>();
    private websocket: WebSocket;

    @Ref('visualisation')
    readonly visualisation: AppVisualisation;

    private readonly api = new ApiService();

    mounted(): void {
        this.connect();
    }

    destroyed(): void {
        if (this.websocket) {
            this.websocket.close();
        }
    }


    private connect(): void {
        this.websocket = this.api.joinMeeting('some-meeting');

        this.websocket.onclose = (event: CloseEvent) => {
            console.log('websocket onclose', event);
        };

        this.websocket.onerror = (event: Event) => {
            console.log('websocket onerror', event);
        };

        this.websocket.onopen = (event: Event) => {
            console.log('websocket onopen', event);
            this.setName('some-name');
            this.sendVisualisationState();
        };

        this.websocket.onmessage = async (event: MessageEvent) => {
            await this.receive(event.data);
        };
    }

    private setName(name: string): void {
        const msg = new SetNameMessage(name);
        this.send(msg);
    }

    private async receive(payload: string): Promise<void> {
        const msg: IncomingMessage = JSON.parse(payload);
        const wrappedMsg: ReceivedMessage = JSON.parse(msg.payload);

        console.log('received message', msg.messageType, wrappedMsg);

        switch (msg.messageType) {
            case IncomingMessageType.Hello:
                return this.onHello(wrappedMsg as HelloMessage);
            case IncomingMessageType.Joined:
                return this.onJoined(wrappedMsg as JoinedMessage);
            case IncomingMessageType.Quit:
                return this.onQuit(wrappedMsg as QuitMessage);
            case IncomingMessageType.NameChanged:
                return this.onNameChanged(wrappedMsg as NameChangedMessage);
            case IncomingMessageType.VisualisationState:
                return this.onVisualisationState(wrappedMsg as VisualisationStateMessage);
            case IncomingMessageType.RemoteSessionDescription:
                return this.onRemoteSessionDescription(wrappedMsg as RemoteSessionDescriptionMessage);
            case IncomingMessageType.RemoteIceCandidate:
                return this.onRemoteIceCandidate(wrappedMsg as RemoteIceCandidateMessage);
            default:
                console.warn('unknown message', msg);
        }
    }

    private onHello(msg: HelloMessage): void {
        this.localParticipantUUID = msg.participantUUID;
    }

    private onJoined(msg: JoinedMessage): void {
        const constraints: MediaStreamConstraints = {
            video: true,
            audio: true,
        };

        const webrtc = new WebRTCCancer(
            this.localParticipantUUID,
            msg.participantUUID,
            s => {
                this.send(new LocalSessionDescriptionMessage(msg.participantUUID, s));
            },
            s => {
                this.send(new LocalIceCandidateMessage(msg.participantUUID, s));
            },
            event => {
                event.track.onunmute = () => {
                    //if (remoteVideo.srcObject) {
                    //    return;
                    //}
                    //remoteVideo.srcObject = event.streams[0];
                    //remoteVideo.play();

                    // var el = document.getElementById('video1');
                    // el.srcObject = event.streams[0];
                    // el.autoplay = true;
                    // el.controls = true;
                };
            },
            constraints,
        );

        const participant = new Participant(msg.participantUUID, webrtc);
        this.participants.set(msg.participantUUID, participant);
    }

    private onQuit(msg: QuitMessage): void {
        const participant = this.participants.get(msg.participantUUID);
        if (participant) {
            participant.webrtc.close();
        }
        this.participants.delete(msg.participantUUID);
    }

    private onNameChanged(msg: NameChangedMessage): void {
        this.participants.get(msg.participantUUID).name = msg.name;
    }

    private onVisualisationState(msg: VisualisationStateMessage): void {
        this.participants.get(msg.participantUUID).state = this.decodeVisusalisationState(msg.state);
        this.visualisation.setParticipants(this.getVisualisationParticipants());
    }

    private async onRemoteSessionDescription(msg: RemoteSessionDescriptionMessage): Promise<void> {
        const participant = this.participants.get(msg.participantUUID);
        return participant.webrtc.onRemoteSessionDescription(msg.sessionDescription);
    }

    private async onRemoteIceCandidate(msg: RemoteIceCandidateMessage): Promise<void> {
        const participant = this.participants.get(msg.participantUUID);
        return participant.webrtc.onRemoteIceCandidate(msg.iceCandidate);
    }

    private send(msg: SentMessage): void {
        const outgoingMessage: OutgoingMessage = {
            messageType: msg.getMessageType(),
            payload: JSON.stringify(msg),
        };

        console.log('sending message', outgoingMessage);

        this.websocket.send(JSON.stringify(outgoingMessage));
    }

    private sendVisualisationState() {
        // todo stop this

        if (this.visualisation) {
            const state = this.encodeVisusalisationState(this.visualisation.getState())
            this.send(new UpdateVisualisationStateMessage(state));
        }

        window.setTimeout(()=>this.sendVisualisationState(), 500);
    }

    private encodeVisusalisationState(state: VisualisationState): string {
        return JSON.stringify(state);
    }

    private decodeVisusalisationState(state: string): VisualisationState {
        return JSON.parse(state);
    }

    private getVisualisationParticipants(): Map<string, VisualisationParticipant> {
        const v = new Map<string, VisualisationParticipant>();

        for (const [key, value] of this.participants) {
            v.set(key, new VisualisationParticipant(value.name, value.state));
        }

        return v;
    }

}
