export class IncomingMessage {
    messageType: IncomingMessageType;
    payload: string;
}

export enum IncomingMessageType {
    Hello = 'hello',
    Joined = 'joined',
    Quit = 'quit',
    NameChanged = 'nameChanged',
    RemoteSessionDescription = 'remoteSessionDescription',
    RemoteIceCandidate = 'remoteIceCandidate',
}

export class OutgoingMessage {
    messageType: OutgoingMessageType;
    payload: string;
}

export enum OutgoingMessageType {
    SetName = 'setName',
    LocalSessionDescription = 'localSessionDescription',
    LocalIceCandidate = 'localIceCandidate',
}
