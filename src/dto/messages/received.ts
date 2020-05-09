export class ReceivedMessage {
}

export class HelloMessage extends ReceivedMessage {
    participantUUID: string;
}

export class JoinedMessage extends ReceivedMessage {
    participantUUID: string;
}

export class QuitMessage extends ReceivedMessage {
    participantUUID: string;
}

export class NameChangedMessage extends ReceivedMessage {
    participantUUID: string;
    name: string;
}

export class RemoteSessionDescriptionMessage extends ReceivedMessage {
    participantUUID: string;
    sessionDescription: string;
}

export class RemoteIceCandidateMessage extends ReceivedMessage {
    participantUUID: string;
    iceCandidate: string;
}
