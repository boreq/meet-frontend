export class ReceivedMessage {
}

export class NameChangedMessage extends ReceivedMessage {
    participantUUID: string;
    name: string;
}
