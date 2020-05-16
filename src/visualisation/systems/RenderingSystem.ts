import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { Vector } from '@/visualisation/types/Vector';
import * as PIXI from 'pixi.js';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { RenderComponent } from '@/visualisation/components/RenderComponent';
import { Camera } from '@/visualisation/entities/Camera';

export interface Renderable {
    position: PositionComponent;
    render: RenderComponent;
}

function isRenderable(entity: Entity): entity is Renderable {
    return (entity as Renderable).position !== undefined &&
        (entity as Renderable).render !== undefined;
}

class TrackedEntity {
    constructor(
        public entity: Renderable,
        public sprite: PIXI.Sprite,
    ) {
    }
}

export class RenderingSystem implements System {

    private trackedEntities: TrackedEntity[] = [];
    private scale = new Vector(100, 100);

    constructor(private app: PIXI.Application, private camera: Camera) {
    }

    setup(): void {
    }

    update(): void {
        for (const trackedEntity of this.trackedEntities) {
            const size = new Vector(this.app.view.width / this.scale.x, this.app.view.height / this.scale.y);
            const topLeftCorner = this.camera.position.subtract(size.multiply(0.5));

            trackedEntity.sprite.width = 1 * this.scale.x;
            trackedEntity.sprite.height = 1 * this.scale.y;
            trackedEntity.sprite.position.x = (trackedEntity.entity.position.x - topLeftCorner.x) * this.scale.x;
            trackedEntity.sprite.position.y = (trackedEntity.entity.position.y - topLeftCorner.y) * this.scale.y;
        }
    }

    addEntity(entity: Entity): void {
        if (isRenderable(entity)) {
            const sprite = new PIXI.Sprite(
                this.app.loader.resources[entity.render.sprite].texture,
            );
            this.app.stage.addChild(sprite);

            this.trackedEntities.push(new TrackedEntity(entity, sprite));
        }
    }

    removeEntity(entity: Entity): void {
        if (isRenderable(entity)) {
            const index = this.trackedEntities.findIndex(v => v.entity === entity);
            if (index >= 0) {
                this.app.stage.removeChild(this.trackedEntities[index].sprite);
                this.trackedEntities.splice(index, 1);
            }
        }
    }
}
