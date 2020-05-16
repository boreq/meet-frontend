import { Entity } from '@/visualisation/ecs/Entity';
import { PositionComponent } from '@/visualisation/components/PositionComponent';

export class Camera implements Entity {
    position: PositionComponent;
}
