import { WebRTCCancer } from '@/webrtc/WebRTCCancer';
import { VisualisationState } from '@/visualisation/VisualisationState';

export class Participant {
    uuid: string;
    name: string;
    state: VisualisationState;
    webrtc: WebRTCCancer;

    constructor(uuid: string, webrtc: WebRTCCancer) {
        this.uuid = uuid;
        this.webrtc = webrtc;
    }

}
