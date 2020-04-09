import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';

export class World {

    private systems: System[] = [];

    addSystem(system: System): void {
        this.systems.push(system);
    }

    getSystems(): System[] {
        return this.systems;
    }

    addEntity(entity: Entity): void {
        for (const system of this.systems) {
            system.add(entity);
        }
    }

    setup(): void {
        for (const system of this.systems) {
            system.setup();
        }
    }

    update(dt: number): void {
        for (const system of this.systems) {
            system.update(dt);
        }
    }

}
