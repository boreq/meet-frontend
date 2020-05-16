export class ApiService {

    joinMeeting(meetingName: string): WebSocket {
        const url = `meet/meetings/${meetingName}/websocket`;
        return new WebSocket(this.websocket_prefix + url);
    }

    get websocket_prefix(): string {
        const prefix: string = process.env.VUE_APP_API_PREFIX;

        if (prefix.startsWith('https://')) {
            return prefix.replace('https://', 'wss://');
        }
        if (prefix.startsWith('http://')) {
            return prefix.replace('http://', 'ws://');
        }

        const origin = window.location.origin;
        if (origin.startsWith('https://')) {
            return origin.replace('https://', 'wss://') + prefix;
        }
        if (origin.startsWith('http://')) {
            return origin.replace('http://', 'ws://') + prefix;
        }

        throw new Error(`error getting websocket prefix (prefix=${prefix} origin=${origin})`);
    }

}
