import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { Key, Keyboard } from '@/visualisation/input/Keyboard';
import { World } from '@/visualisation/ecs/World';
import { Gopher } from '@/visualisation/entities/Gopher';

export class GopherSystem implements System {

    private gopher: Gopher;

    constructor(private keyboard: Keyboard, private world: World) {
    }

    setup(): void {
        this.gopher = {
            position: {
                x: 0,
                y: 0,
            },
        };

        this.world.addEntity(this.gopher);
    }

    update(dt: number): void {
        const gopherSpeed = 1;

        if (this.keyboard.isDown(Key.Left)) {
            this.gopher.position.x -= gopherSpeed * dt;
        }

        if (this.keyboard.isDown(Key.Right)) {
            this.gopher.position.x += gopherSpeed * dt;
        }

        if (this.keyboard.isDown(Key.Up)) {
            this.gopher.position.y -= gopherSpeed * dt;
        }

        if (this.keyboard.isDown(Key.Down)) {
            this.gopher.position.y += gopherSpeed * dt;
        }
    }

    add(entity: Entity): void {
    }

    remove(entity: Entity): void {
    }

}
