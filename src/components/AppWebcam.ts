import { Component, Vue } from 'vue-property-decorator';
import { Vector } from '@/visualisation/types/Vector';

@Component({
    components: {},
})
export default class AppWebcam extends Vue {

    private settings: MediaTrackSettings = null;
    private readonly targetSize = 200;

    get size(): any {
        const size = this.settings ?
            this.getSize(this.settings.width, this.settings.height, this.targetSize) :
            new Vector(this.targetSize, this.targetSize);
        return {
            width: Math.round(size.x) + 'px',
            height: Math.round(size.y) + 'px',
        };
    }

    async created(): Promise<void> {
        try {
            const mediaStream = await this.getMedia();
            const video = document.querySelector('video');
            video.muted = true;
            video.autoplay = true;
            video.srcObject = mediaStream;

            this.settings = mediaStream.getVideoTracks().find(() => true).getSettings();
        } catch (err) {
            console.error('AppWebcam.created()', err);
        }
    }

    private getSize(width: number, height: number, target: number): Vector {
        const aspectRatio = width / height;
        if (width > height) {
            return new Vector(target * aspectRatio, target);
        } else {
            return new Vector(target, target / aspectRatio);
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
