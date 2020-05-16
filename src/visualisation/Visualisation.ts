import * as PIXI from 'pixi.js';
import { Sprite } from '@/visualisation/Sprite';
import { World } from '@/visualisation/ecs/World';
import { EventKeyboard, Key } from '@/visualisation/input/Keyboard';
import { RenderingSystem } from '@/visualisation/systems/RenderingSystem';
import { WorldMap } from '@/visualisation/WorldMap';
import { MapSystem } from '@/visualisation/systems/MapSystem';
import { VisualisationParticipant } from '@/components/AppVisualisation';
import { ParticipantsSystem } from '@/visualisation/systems/ParticipantsSystem';
import { VisualisationState } from '@/visualisation/VisualisationState';
import { ControlSystem } from '@/visualisation/systems/ControlSystem';
import { Participant } from '@/visualisation/entities/Participant';
import { Vector } from '@/visualisation/types/Vector';
import { MovementSystem } from '@/visualisation/systems/MovementSystem';
import { VideoRenderingSystem } from '@/visualisation/systems/VideoRenderingSystem';
import { Camera } from '@/visualisation/entities/Camera';
import { CameraSystem } from '@/visualisation/systems/CameraSystem';

export class Visualisation {

    private app: PIXI.Application;
    private world: World;
    private participant: Participant = {
        position: new Vector(0, 0),
        speed: new Vector(0, 0),
        render: {
            sprite: Sprite.Gopher,
        },
        control: {
            up: Key.Up,
            left: Key.Left,
            right: Key.Right,
            down: Key.Down,
        },
    };
    private camera: Camera = {
        position: new Vector(0, 0),
        speed: new Vector(0, 0),
    };

    private readonly participants = new Map<string, VisualisationParticipant>();

    constructor() {
        this.app = new PIXI.Application({width: 256, height: 256});

        this.app.loader
            .add(this.spritesToLoad())
            .load(() => this.setup());
    }

    setParticipants(participants: Map<string, VisualisationParticipant>): void {
        this.participants.clear();
        for (const [key, value] of participants.entries()) {
            this.participants.set(key, value);
        }
    }

    getState(): VisualisationState {
        return {
            position: new Vector(this.participant.position.x, this.participant.position.y),
        };
    }

    canvas(): HTMLCanvasElement {
        return this.app.view;
    }

    resize(width: number, height: number): void {
        this.app.renderer.resize(width, height);
    }

    private setup(): void {
        const keyboard = new EventKeyboard();

        const map: WorldMap = {
            tiles: [
                [Sprite.Dirt, Sprite.Dirt, Sprite.Dirt, Sprite.Dirt, Sprite.Dirt],
                [Sprite.Grass, Sprite.Dirt, Sprite.Grass, Sprite.Dirt, Sprite.Grass],
                [Sprite.Grass, Sprite.Dirt, Sprite.Grass, Sprite.Dirt, Sprite.Grass],
                [Sprite.Grass, Sprite.Dirt, Sprite.Grass, Sprite.Dirt, Sprite.Grass],
                [Sprite.Grass, Sprite.Dirt, Sprite.Grass, Sprite.Dirt, Sprite.Grass],
            ],
        };

        this.world = new World();
        this.world.addSystem(new MapSystem(map, this.world));
        this.world.addSystem(new ControlSystem(keyboard));
        this.world.addSystem(new ParticipantsSystem(this.world, this.participants));
        this.world.addSystem(new MovementSystem());
        this.world.addSystem(new CameraSystem(this.camera, this.participant));
        this.world.addSystem(new VideoRenderingSystem(this.app, this.camera));
        this.world.addSystem(new RenderingSystem(this.app, this.camera));
        this.world.setup();

        this.world.addEntity(this.participant);
        this.world.addEntity(this.camera);

        this.app.ticker.add(delta => this.update(this.asDT(delta)));
    }

    private update(dt: number): void {
        this.world.update(dt);
    }

    private spritesToLoad(): string[] {
        return Object.values(Sprite);
    }

    // For a bizarre (and surely stupid) reason delta is a coefficient equal to
    // (60 / currentFPS). This function converts this coefficient to a much
    // more physically meaningful value representing the number of seconds
    // which have most likely passed since the last frame.
    private asDT(delta: number): number {
        const fps = 60 / delta;
        return 1 / fps;
    }
}
