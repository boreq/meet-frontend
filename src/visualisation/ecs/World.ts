import { System } from '@/visualisation/ecs/System';

export class World {

    private systems: System[] = [];

    addSystem(system: System): void {
        this.systems.push(system);
    }

    update(dt: number): void {
        for (const system of this.systems) {
            system.update(dt);
        }
    }

}
