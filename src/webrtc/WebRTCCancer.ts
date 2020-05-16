export type SendLocalSessionDescriptionFunc = (s: string) => void;
export type SendLocalIceCandidateFunc = (s: string) => void;
export type OnRemoteTrackFunc = (event: RTCTrackEvent) => void;

export class WebRTCCancer {

    private peerConnection: RTCPeerConnection;
    private makingOffer: boolean;
    private iceCandidates: RTCIceCandidate[] = [];

    constructor(
        private localParticipantUUID: string,
        private remoteParticipantUUID: string,
        private sendLocalSessionDescription: SendLocalSessionDescriptionFunc,
        private sendLocalIceCandidate: SendLocalIceCandidateFunc,
        private onRemoteTrack: OnRemoteTrackFunc,
        private constraints: MediaStreamConstraints,
    ) {
        this.webrtcConnect();
    }

    close(): void {
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }

    async onRemoteSessionDescription(remoteSessionDescriptionString: string): Promise<void> {
        const remoteSessionDescription = this.decodeSessionDescription(remoteSessionDescriptionString);

        try {
            const offerCollision = remoteSessionDescription.type === 'offer' &&
                (this.makingOffer || this.peerConnection.signalingState != 'stable');

            const ignoreOffer = !this.isPolite() && offerCollision;
            if (ignoreOffer) {
                return;
            }

            if (remoteSessionDescription.type === 'offer') {
                await this.peerConnection.setRemoteDescription(remoteSessionDescription);
                await this.tryAddIceCandidates();
                const stream =
                    await navigator.mediaDevices.getUserMedia({video: true, audio: false});
                stream.getTracks().forEach((track) =>
                    this.peerConnection.addTrack(track, stream));
                await this.peerConnection.setLocalDescription(await this.peerConnection.createAnswer());
                const localSdp = this.encodeSessionDescription(this.peerConnection.localDescription);
                console.log('sending sdp (received offer)');
                this.sendLocalSessionDescription(localSdp);
            } else if (remoteSessionDescription.type === 'answer') {
                await this.peerConnection.setRemoteDescription(remoteSessionDescription);
                await this.tryAddIceCandidates();
            } else {
                console.warn('Unsupported SDP type.', remoteSessionDescription.type);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async onRemoteIceCandidate(s: string): Promise<void> {
        const iceCandidate = this.decodeIceCandidate(s);
        if (this.canNotAddIceCandidate()) {
            // for some reason ice candidates can be added only after remote
            // description is present so we may have to put a candidate onto a
            // queue
            this.iceCandidates.push(iceCandidate);
            return;
        }
        return this.peerConnection.addIceCandidate(iceCandidate);
    }

    private async tryAddIceCandidates(): Promise<void> {
        if (!this.canNotAddIceCandidate()) {
            for (const iceCandidate of this.iceCandidates) {
                try {
                    console.log(iceCandidate);
                    await this.peerConnection.addIceCandidate(iceCandidate);
                } catch (e) {
                    console.log('could not add ice candidate', e);
                }
            }
            this.iceCandidates = [];
        }
    }

    private canNotAddIceCandidate(): boolean {
        return !this.peerConnection || !this.peerConnection.remoteDescription || !this.peerConnection.remoteDescription.type;
    }

    private webrtcConnect(): void {
        const config: RTCConfiguration = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        };

        this.peerConnection = new RTCPeerConnection(config);

        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('state change', this.peerConnection.iceConnectionState);
        };

        this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                const iceCandidate = this.encodeIceCandidate(event.candidate);
                this.sendLocalIceCandidate(iceCandidate);
            }
        };

        this.peerConnection.ontrack = (event: RTCTrackEvent) => {
            console.log('on remote track', event);
            this.onRemoteTrack(event);
        };

        this.peerConnection.onnegotiationneeded = async (event: Event) => {
            console.log('on negotiation needed', event);
            try {
                this.makingOffer = true;
                await this.peerConnection.setLocalDescription(await this.peerConnection.createOffer());
                const localSessionDescription = this.encodeSessionDescription(this.peerConnection.localDescription);
                console.log('sending local session description (negotiation needed)');
                this.sendLocalSessionDescription(localSessionDescription);
            } catch (err) {
                console.log('negotiation needed error', err);
            } finally {
                this.makingOffer = false;
            }
        };

        this.peerConnection.addTransceiver('video');

        try {
            navigator.mediaDevices.getUserMedia(this.constraints)
                .then(stream => {
                    for (const track of stream.getTracks()) {
                        console.log('adding a local track', track.id, track.label);
                        this.peerConnection.addTrack(track);
                    }
                })
                .catch(e => console.log('get user media', e));
        } catch (e) {
            console.log('add media failed', e);
        }
    }

    private isPolite(): boolean {
        return this.localParticipantUUID > this.remoteParticipantUUID;
    }

    private encodeSessionDescription(sdp: RTCSessionDescription): string {
        return btoa(JSON.stringify(sdp));
    }

    private decodeSessionDescription(sdp: string): RTCSessionDescription {
        return JSON.parse(atob(sdp));
    }

    private encodeIceCandidate(candidate: RTCIceCandidate): string {
        return btoa(JSON.stringify(candidate));
    }

    private decodeIceCandidate(candidate: string): RTCIceCandidate {
        console.log('candidate', atob(candidate));
        return JSON.parse(atob(candidate));
    }

}
