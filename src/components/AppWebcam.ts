import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class AppWebcam extends Vue {

    created(): void {
        console.log(navigator.mediaDevices.getSupportedConstraints());
        try {
            const media = this.getMedia();
            media.then(mediaStream => {
                console.log(mediaStream);
                const video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.muted = true;
                video.onloadedmetadata = () => {
                    video.play();
                };
            }).catch(err => {
                console.log(err);
            });
        } catch (e) {
            console.log(e);
        }
    }

    private getMedia(): Promise<MediaStream> {
        const constraints: MediaStreamConstraints = {
            audio: true,
            video: {
                width: {
                    exact: 200,
                },
                height: {
                    exact: 200,
                },
            },
        };
        return navigator.mediaDevices.getUserMedia(constraints);
    }

}
