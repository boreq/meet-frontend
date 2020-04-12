import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { JoinMeetingRequest } from '@/model/JoinMeetingRequest';
import { JoinMeetingResponse } from '@/model/JoinMeetingResponse';

export class ApiService {

    private readonly axios = axios.create();

    joinMeeting(meetingName: string, cmd: JoinMeetingRequest): Promise<AxiosResponse<JoinMeetingResponse>> {
        const url = `meet/meetings/${meetingName}/sdp`;
        return this.axios.post<JoinMeetingResponse>(process.env.VUE_APP_API_PREFIX + url, cmd);
    }

}
