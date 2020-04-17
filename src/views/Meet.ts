import { Component, Vue } from 'vue-property-decorator';
import AppWebcam from '@/components/AppWebcam.vue';
import AppVisualisation from '@/components/AppVisualisation.vue';
import { ApiService } from '@/services/ApiService';
import { IncomingMessage, IncomingMessageType, OutgoingMessage } from '@/dto/Message';
import { NameChangedMessage, ReceivedMessage } from '@/dto/messages/received';
import { SentMessage, SetNameMessage } from '@/dto/messages/sent';

@Component({
    components: {
        AppWebcam,
        AppVisualisation,
    },
})
export default class Meet extends Vue {

    private websocket: WebSocket;

    private readonly api = new ApiService();

    mounted(): void {
        this.connect();
    }

    private connect(): void {
        this.websocket = this.api.joinMeeting('some-meeting');

        this.websocket.onclose = (event: CloseEvent) => {
            console.log('close', event);
        };

        this.websocket.onerror = (event: Event) => {
            console.log('error', event);
        };

        this.websocket.onopen = (event: Event) => {
            console.log('open', event);
            this.setName('some-name');
        };

        this.websocket.onmessage = (event: MessageEvent) => {
            console.log('message', event);
            this.receive(event.data);
        };
    }

    private setName(name: string): void {
        const msg = new SetNameMessage(name);
        this.send(msg);
    }

    private receive(payload: string): void {
        const msg: IncomingMessage = JSON.parse(payload);
        const wrappedMsg: ReceivedMessage = JSON.parse(msg.payload);

        switch (msg.messageType) {
            case IncomingMessageType.NameChanged:
                this.onNameChanged(wrappedMsg as NameChangedMessage);
                break;
            default:
                console.log('unknown message', msg);
        }
    }

    private onNameChanged(msg: NameChangedMessage): void {
        console.log('received name changed message', msg);
    }

    private send(msg: SentMessage): void {
        const outgoingMessage: OutgoingMessage = {
            messageType: msg.getMessageType(),
            payload: JSON.stringify(msg),
        };
        this.websocket.send(JSON.stringify(outgoingMessage));
    }

    // private a(): void {
    //     const peerConnection = new RTCPeerConnection({
    //         iceServers: [
    //             {
    //                 urls: 'stun:stun.l.google.com:19302',
    //             },
    //         ],
    //     });
    //
    //     peerConnection.oniceconnectionstatechange = (event: Event) => {
    //         console.log('state change', peerConnection.iceConnectionState);
    //     };
    //
    //     peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    //         if (event.candidate === null) {
    //             // console.log('local session description', JSON.stringify(peerConnection.localDescription, null, 4));
    //             const sdp = btoa(JSON.stringify(peerConnection.localDescription));
    //             this.api.joinMeeting('some-meeting', {
    //                 sdp: sdp,
    //             })
    //                 .then(
    //                     response => {
    //                         // console.log(response.data.sdp);
    //                         peerConnection.setRemoteDescription(JSON.parse(atob(response.data.sdp)));
    //                         console.log('remote sdp set');
    //                     },
    //                     err => {
    //                         console.log('sdp error', err);
    //                     },
    //                 );
    //         }
    //     };
    //
    //     // if (isPublisher) {
    //
    //     peerConnection.ontrack = (event: RTCTrackEvent) => {
    //         console.log('track id', event.track.id);
    //         console.log('track label', event.track.label);
    //         // var el = document.getElementById('video1');
    //         // el.srcObject = event.streams[0];
    //         // el.autoplay = true;
    //         // el.controls = true;
    //     };
    //
    //     peerConnection.onnegotiationneeded = (event: Event) => {
    //         console.log('negotation needed', event);
    //     };
    //
    //     navigator.mediaDevices.getUserMedia({video: true, audio: false})
    //         .then(stream => {
    //             // peerConnection.addStream(document.getElementById('video1').srcObject = stream);
    //             peerConnection.addTransceiver('video');
    //             for (const track of stream.getTracks()) {
    //                 peerConnection.addTrack(track);
    //             }
    //             peerConnection.createOffer()
    //                 .then(d => peerConnection.setLocalDescription(d))
    //                 .catch(e => console.log('create offer', e));
    //         }).catch(e => console.log('get user media', e));
    //     // } else {
    //     //     peerConnection.addTransceiver('video')
    //     //     peerConnection.createOffer()
    //     //         .then(d => peerConnection.setLocalDescription(d))
    //     //         .catch(log)
    //     //
    //     //     peerConnection.ontrack = function (event) {
    //     //         var el = document.getElementById('video1')
    //     //         el.srcObject = event.streams[0]
    //     //         el.autoplay = true
    //     //         el.controls = true
    //     //     }
    //     // }
    // }
}
