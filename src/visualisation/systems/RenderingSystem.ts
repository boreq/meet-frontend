import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { Vector } from '@/visualisation/types/Vector';
import * as PIXI from 'pixi.js';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { RenderComponent } from '@/visualisation/components/RenderComponent';

export interface Renderable {
    position: PositionComponent;
    render: RenderComponent;
}

function isRenderable(entity: Entity): entity is Renderable {
    return (entity as Renderable).position !== undefined &&
        (entity as Renderable).render !== undefined;
}

export class RenderingSystem implements System {

    private entities: Renderable[] = [];
    private sprites: PIXI.Sprite[] = [];
    private scale = new Vector(100, 100);

    constructor(private app: PIXI.Application) {
    }

    setup(): void {
    }

    update(dt: number): void {
        for (let i = 0; i < this.entities.length; i++) {
            const sprite = this.sprites[i];
            const entity = this.entities[i];

            sprite.width = 1 * this.scale.x;
            sprite.height = 1 * this.scale.y;
            sprite.position.x = entity.position.x * this.scale.x;
            sprite.position.y = entity.position.y * this.scale.y;
        }
    }

    addEntity(entity: Entity): void {
        if (isRenderable(entity)) {
            console.log('adding a renderable entity', entity);

            const sprite = new PIXI.Sprite(
                this.app.loader.resources[entity.render.sprite].texture,
            );
            this.app.stage.addChild(sprite);

            this.sprites.push(sprite);
            this.entities.push(entity);
        }
    }

    removeEntity(): void {
        // todo implement
        // index = this.entities.find()
        // this.entities = this.entities.filter(v => v !== entity);
    }
}
