import { Renderable } from '@/visualisation/systems/RenderingSystem';
import { Entity } from '@/visualisation/ecs/Entity';
import { Vector } from '@/visualisation/types/Vector';

export class Gopher implements Renderable, Entity {
    position: Vector;
}
