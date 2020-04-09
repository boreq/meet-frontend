export interface Keyboard {

    isDown(key: Key): boolean;

}

export enum Key {
    Up = 'ArrowUp',
    Down = 'ArrowDown',
    Left = 'ArrowLeft',
    Right = 'ArrowRight',
}

export class EventKeyboard implements Keyboard {

    private keystate = new Map<string, boolean>();

    constructor() {
        document.addEventListener(
            'keydown',
            event => this.onKeyDown(event),
        );
        document.addEventListener(
            'keyup',
            event => this.onKeyUp(event),
        );
        // todo remove the listeners
    }

    isDown(key: Key): boolean {
        return this.keystate.get(key) ?? false;
    }

    private onKeyDown(event: KeyboardEvent): void {
        console.log('down', event);
        this.keystate.set(event.code, true);
    }

    private onKeyUp(event: KeyboardEvent): void {
        console.log('up', event);
        this.keystate.set(event.code, false);
    }

}
