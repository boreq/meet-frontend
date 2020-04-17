import { OutgoingMessageType } from '@/dto/Message';

export interface SentMessage {
    getMessageType(): OutgoingMessageType;
}

export class SetNameMessage implements SentMessage {

    constructor(public name: string) {
    }

    getMessageType(): OutgoingMessageType {
        return OutgoingMessageType.SetName;
    }
}
