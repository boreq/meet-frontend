import { Component, Vue } from 'vue-property-decorator';
import AppWebcam from '@/components/AppWebcam.vue';
import AppVisualisation from '@/components/AppVisualisation.vue';
import { ApiService } from '@/services/ApiService';

@Component({
    components: {
        AppWebcam,
        AppVisualisation,
    },
})
export default class Meet extends Vue {

    private readonly api = new ApiService();

    mounted(): void {
        this.a();
    }

    private a(): void {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        });

        peerConnection.oniceconnectionstatechange = (event: Event) => {
            console.log('state change', peerConnection.iceConnectionState);
        };

        peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate === null) {
                console.log('local session description', JSON.stringify(peerConnection.localDescription, null, 4));
                const sdp = btoa(JSON.stringify(peerConnection.localDescription));
                this.api.joinMeeting('some-meeting', {
                    sdp: sdp,
                })
                    .then(
                        response => {
                            console.log(response.data.sdp);
                            peerConnection.setRemoteDescription(JSON.parse(atob(response.data.sdp)));
                            console.log('sdp sent');
                        },
                        err => {
                            console.log('sdp error', err);
                        },
                    );
            }
        };

        // if (isPublisher) {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(stream => {
                // peerConnection.addStream(document.getElementById('video1').srcObject = stream);
                for (const track of stream.getTracks()) {
                    peerConnection.addTrack(track);
                }
                peerConnection.createOffer()
                    .then(d => peerConnection.setLocalDescription(d))
                    .catch(e => console.log('create offer', e));
            }).catch(e => console.log('get user media', e));
        // } else {
        //     peerConnection.addTransceiver('video')
        //     peerConnection.createOffer()
        //         .then(d => peerConnection.setLocalDescription(d))
        //         .catch(log)
        //
        //     peerConnection.ontrack = function (event) {
        //         var el = document.getElementById('video1')
        //         el.srcObject = event.streams[0]
        //         el.autoplay = true
        //         el.controls = true
        //     }
        // }
    }
}
