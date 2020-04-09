import * as PIXI from 'pixi.js';
import { Sprite } from '@/visualisation/Sprite';
import { World } from '@/visualisation/ecs/World';
import { EventKeyboard, Keyboard } from '@/visualisation/input/Keyboard';
import { GopherSystem } from '@/visualisation/systems/GopherSystem';
import { RenderingSystem } from '@/visualisation/systems/RenderingSystem';

export class Visualisation {

    private app: PIXI.Application;
    private world: World;
    private keyboard: Keyboard;

    constructor() {
        this.app = new PIXI.Application({width: 256, height: 256});

        this.app.loader
            .add(this.spritesToLoad())
            .load(() => this.setup());
    }

    canvas(): HTMLCanvasElement {
        return this.app.view;
    }

    resize(width: number, height: number): void {
        this.app.renderer.resize(width, height);
    }

    private setup(): void {
        this.keyboard = new EventKeyboard();

        this.world = new World();
        this.world.addSystem(new GopherSystem(this.keyboard, this.world));
        this.world.addSystem(new RenderingSystem(this.app));

        this.world.setup();

        this.app.ticker.add(delta => this.update(this.asDT(delta)));
    }

    private update(dt: number): void {
        this.world.update(dt);
    }

    private spritesToLoad(): string[] {
        return Object.values(Sprite);
    }

    // For a bizzare (and surely stupid) reason delta is a coefficient equal to
    // (60 / currentFPS). This function converts this coefficient to a much
    // more physically meaningful value representing the number of seconds
    // which have most likely passed since the last frame.
    private asDT(delta: number): number {
        const fps = 60 / delta;
        return 1 / fps;
    }

}
