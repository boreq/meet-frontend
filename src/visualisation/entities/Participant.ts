import { Renderable } from '@/visualisation/systems/RenderingSystem';
import { Entity } from '@/visualisation/ecs/Entity';
import { PositionComponent } from '@/visualisation/components/PositionComponent';
import { RenderComponent } from '@/visualisation/components/RenderComponent';
import { ControlComponent } from '@/visualisation/components/ControlComponent';
import { SpeedComponent } from '@/visualisation/components/SpeedComponent';
import { StreamComponent } from '@/visualisation/components/StreamComponent';

export class Participant implements Renderable, Entity {
    position: PositionComponent;
    speed: SpeedComponent;
    render: RenderComponent;
    control?: ControlComponent;
    streams?: StreamComponent;
}
