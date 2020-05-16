import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { Vector } from '@/visualisation/types/Vector';
import * as PIXI from 'pixi.js';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { StreamComponent } from '@/visualisation/components/StreamComponent';
import Texture = PIXI.Texture;

export interface VideoRenderable {
    position: PositionComponent;
    streams: StreamComponent;
}

function isVideoRenderable(entity: Entity): entity is VideoRenderable {
    return (entity as VideoRenderable).position !== undefined &&
        (entity as VideoRenderable).streams !== undefined;
}

export class VideoRenderingSystem implements System {

    private readonly entities: VideoRenderable[] = [];
    private readonly sprites: PIXI.Sprite[] = [];
    private readonly videos: HTMLVideoElement[] = [];

    private readonly size = new Vector(1, 1);
    private readonly scale = new Vector(100, 100);
    private readonly offset = new Vector(0, -1);

    constructor(private app: PIXI.Application) {
    }

    setup(): void {
    }

    update(): void {
        for (let i = 0; i < this.entities.length; i++) {
            const sprite = this.sprites[i];
            const entity = this.entities[i];
            const video = this.videos[i];

            sprite.width = this.size.x * this.scale.x;
            sprite.height = this.size.y * this.scale.y;
            sprite.position.x = (entity.position.x + this.offset.x) * this.scale.x;
            sprite.position.y = (entity.position.y + this.offset.y) * this.scale.y;

            const stream = entity.streams.stream;
            if (stream) {
                if (!video.srcObject) {
                    video.srcObject = stream;
                    video.play();
                }
            }
        }
    }

    addEntity(entity: Entity): void {
        if (isVideoRenderable(entity)) {
            const video: HTMLVideoElement = document.createElement('video');

            const sprite = new PIXI.Sprite(
                Texture.from(video),
            );
            this.app.stage.addChild(sprite);

            this.sprites.push(sprite);
            this.entities.push(entity);
            this.videos.push(video);
        }
    }

    removeEntity(): void {
        // todo implement
        // index = this.entities.find()
        // this.entities = this.entities.filter(v => v !== entity);
    }
}
