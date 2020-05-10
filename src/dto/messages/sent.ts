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

export class UpdateVisualisationStateMessage implements SentMessage {

    constructor(public state: string) {
    }

    getMessageType(): OutgoingMessageType {
        return OutgoingMessageType.UpdateVisualisationState;
    }
}

export class LocalSessionDescriptionMessage implements SentMessage {

    constructor(public targetParticipantUUID: string, public sessionDescription: string) {
    }

    getMessageType(): OutgoingMessageType {
        return OutgoingMessageType.LocalSessionDescription;
    }
}

export class LocalIceCandidateMessage implements SentMessage {

    constructor(public targetParticipantUUID: string, public iceCandidate: string) {
    }

    getMessageType(): OutgoingMessageType {
        return OutgoingMessageType.LocalIceCandidate;
    }
}
