import { Renderable } from '@/visualisation/systems/RenderingSystem';
import { Entity } from '@/visualisation/ecs/Entity';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { RenderComponent } from '@/visualisation/components/RenderComponent';

export class Gopher implements Renderable, Entity {
    position: PositionComponent;
    render: RenderComponent;
}
