import { System } from '@/visualisation/ecs/System';
import { Keyboard } from '@/visualisation/input/Keyboard';
import { PositionComponent } from '../components/PositionComponent';
import { Entity } from '../ecs/Entity';
import { ControlComponent } from '../components/ControlComponent';

export interface Controlable {
    position: PositionComponent;
    control: ControlComponent;
}

function isControlable(entity: Entity): entity is Controlable {
    return (entity as Controlable).control !== undefined &&
        (entity as Controlable).position !== undefined;
}

export class ControlSystem implements System {

    private entities: Controlable[] = [];

    constructor(private keyboard: Keyboard) {
    }

    setup(): void {
    }

    update(dt: number): void {
        const speed = 1;

        for (const entity of this.entities) {
            if (this.keyboard.isDown(entity.control.left)) {
                entity.position.x -= speed * dt;
            }

            if (this.keyboard.isDown(entity.control.right)) {
                entity.position.x += speed * dt;
            }

            if (this.keyboard.isDown(entity.control.up)) {
                entity.position.y -= speed * dt;
            }

            if (this.keyboard.isDown(entity.control.down)) {
                entity.position.y += speed * dt;
            }
        }
    }

    addEntity(entity: Entity): void {
        if (isControlable(entity)) {
            this.entities.push(entity);
        }
    }

    removeEntity(entity: Entity): void {
        this.entities = this.entities.filter(v => v !== entity);
    }

}
