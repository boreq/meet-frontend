import { Entity } from '@/visualisation/ecs/Entity';

export interface System {
    update(dt: number): void;

    remove(entity: Entity): void;
}
