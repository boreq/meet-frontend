import * as PIXI from 'pixi.js';
import { Sprite } from '@/visualisation/Sprite';

export class Visualisation {

    private app: PIXI.Application;

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
        const sprite = new PIXI.Sprite(
            this.app.loader.resources[Sprite.Gopher].texture,
        );

        this.app.stage.addChild(sprite);
    }

    private spritesToLoad(): string[] {
        return Object.values(Sprite);
    }

}
