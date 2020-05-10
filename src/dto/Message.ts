export class IncomingMessage {
    messageType: IncomingMessageType;
    payload: string;
}

export enum IncomingMessageType {
    Hello = 'hello',
    Joined = 'joined',
    Quit = 'quit',
    NameChanged = 'nameChanged',
    VisualisationState = 'visualisationState',
    RemoteSessionDescription = 'remoteSessionDescription',
    RemoteIceCandidate = 'remoteIceCandidate',
}

export class OutgoingMessage {
    messageType: OutgoingMessageType;
    payload: string;
}

export enum OutgoingMessageType {
    SetName = 'setName',
    UpdateVisualisationState = 'updateVisualisationState',
    LocalSessionDescription = 'localSessionDescription',
    LocalIceCandidate = 'localIceCandidate',
}
