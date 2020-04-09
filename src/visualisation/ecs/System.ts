import { Entity } from '@/visualisation/ecs/Entity';

export interface System {
    setup(): void;

    update(dt: number): void;

    add(entity: Entity): void;

    remove(entity: Entity): void;
}
