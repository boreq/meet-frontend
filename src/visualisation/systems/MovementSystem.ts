import { System } from '@/visualisation/ecs/System';
import { PositionComponent } from '../components/PositionComponent';
import { Entity } from '../ecs/Entity';
import { SpeedComponent } from '@/visualisation/components/SpeedComponent';

export interface Moveable {
    position: PositionComponent;
    speed: SpeedComponent;
}

function isMoveable(entity: Entity): entity is Moveable {
    return (entity as Moveable).position !== undefined &&
        (entity as Moveable).speed !== undefined;
}

export class MovementSystem implements System {

    private entities: Moveable[] = [];

    constructor() {
    }

    setup(): void {
    }

    update(dt: number): void {
        for (const entity of this.entities) {
            entity.position = entity.position.add(entity.speed.multiply(dt));
        }
    }

    addEntity(entity: Entity): void {
        if (isMoveable(entity)) {
            this.entities.push(entity);
        }
    }

    removeEntity(entity: Entity): void {
        this.entities = this.entities.filter(v => v !== entity);
    }

}
