import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { Vector } from '@/visualisation/types/Vector';
import * as PIXI from 'pixi.js';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { StreamComponent } from '@/visualisation/components/StreamComponent';
import { Camera } from '@/visualisation/entities/Camera';
import Texture = PIXI.Texture;

export interface VideoRenderable {
    position: PositionComponent;
    streams: StreamComponent;
}

function isVideoRenderable(entity: Entity): entity is VideoRenderable {
    return (entity as VideoRenderable).position !== undefined &&
        (entity as VideoRenderable).streams !== undefined;
}

class TrackedEntity {
    constructor(
        public entity: VideoRenderable,
        public sprite: PIXI.Sprite,
        public video: HTMLVideoElement,
    ) {
    }
}

export class VideoRenderingSystem implements System {

    private readonly trackedEntities: TrackedEntity[] = [];

    private readonly size = new Vector(1, 1);
    private readonly scale = new Vector(100, 100);
    private readonly offset = new Vector(0, -1);

    constructor(private app: PIXI.Application, private camera: Camera) {
    }

    setup(): void {
    }

    update(): void {
        for (const trackedEntity of this.trackedEntities) {
            // const sprite = this.sprites[i];
            // const entity = this.entities[i];
            // const video = this.videos[i];

            const size = new Vector(this.app.view.width / this.scale.x, this.app.view.height / this.scale.y);
            const topLeftCorner = this.camera.position.subtract(size.multiply(0.5));

            trackedEntity.sprite.width = this.size.x * this.scale.x;
            trackedEntity.sprite.height = this.size.y * this.scale.y;
            trackedEntity.sprite.position.x = (trackedEntity.entity.position.x + this.offset.x - topLeftCorner.x) * this.scale.x;
            trackedEntity.sprite.position.y = (trackedEntity.entity.position.y + this.offset.y - topLeftCorner.y) * this.scale.y;

            const stream = trackedEntity.entity.streams.stream;
            if (stream) {
                if (!trackedEntity.video.srcObject) {
                    trackedEntity.video.srcObject = stream;
                    trackedEntity.video.play();
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

            this.trackedEntities.push(new TrackedEntity(entity, sprite, video));
        }
    }

    removeEntity(entity: Entity): void {
        if (isVideoRenderable(entity)) {
            const index = this.trackedEntities.findIndex(v => v.entity === entity);
            if (index >= 0) {
                this.app.stage.removeChild(this.trackedEntities[index].sprite);
                this.trackedEntities[index].video.remove();
                this.trackedEntities.splice(index, 1);
            }
        }
    }
}
