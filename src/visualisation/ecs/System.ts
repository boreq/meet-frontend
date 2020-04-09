import { Entity } from '@/visualisation/ecs/Entity';

export interface System {
    setup(): void;

    update(dt: number): void;

    addEntity(entity: Entity): void;

    removeEntity(entity: Entity): void;
}
