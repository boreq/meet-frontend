import { System } from '@/visualisation/ecs/System';
import { Keyboard } from '@/visualisation/input/Keyboard';
import { Entity } from '../ecs/Entity';
import { ControlComponent } from '../components/ControlComponent';
import { SpeedComponent } from '@/visualisation/components/SpeedComponent';

export interface Controlable {
    speed: SpeedComponent;
    control: ControlComponent;
}

function isControlable(entity: Entity): entity is Controlable {
    return (entity as Controlable).control !== undefined &&
        (entity as Controlable).speed !== undefined;
}

export class ControlSystem implements System {

    private entities: Controlable[] = [];

    constructor(private keyboard: Keyboard) {
    }

    setup(): void {
    }

    update(): void {
        const speed = 1;

        for (const entity of this.entities) {
            if (this.keyboard.isDown(entity.control.left)) {
                entity.speed.x = -speed;
            } else if (this.keyboard.isDown(entity.control.right)) {
                entity.speed.x = speed;
            } else {
                entity.speed.x = 0;
            }

            if (this.keyboard.isDown(entity.control.up)) {
                entity.speed.y = -speed;
            } else if (this.keyboard.isDown(entity.control.down)) {
                entity.speed.y = speed;
            } else {
                entity.speed.y = 0;
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
