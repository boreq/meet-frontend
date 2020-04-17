export class IncomingMessage {
    messageType: IncomingMessageType;
    payload: string;
}

export enum IncomingMessageType {
    NameChanged = 'nameChanged',
}

export class OutgoingMessage {
    messageType: OutgoingMessageType;
    payload: string;
}

export enum OutgoingMessageType {
    SetName = 'setName',
}
