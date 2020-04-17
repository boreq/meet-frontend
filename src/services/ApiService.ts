export class ApiService {

    joinMeeting(meetingName: string): WebSocket {
        const url = `meet/meetings/${meetingName}/websocket`;
        return new WebSocket(process.env.VUE_APP_WEBSOCKET_API_PREFIX + url);
    }

}
