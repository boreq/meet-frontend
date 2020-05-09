import { WebRTCCancer } from '@/webrtc/webrtc';

export class Participant {
    uuid: string;
    name: string;
    webrtc: WebRTCCancer;

    constructor(uuid: string, webrtc: WebRTCCancer) {
        this.uuid = uuid;
        this.webrtc = webrtc;
    }

}
