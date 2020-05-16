import { System } from '@/visualisation/ecs/System';
import { World } from '@/visualisation/ecs/World';
import { Gopher } from '@/visualisation/entities/Gopher';
import { Sprite } from '@/visualisation/Sprite';
import { VisualisationParticipant } from '@/components/AppVisualisation';
import { Vector } from '@/visualisation/types/Vector';

export class ParticipantsSystem implements System {

    private entities = new Map<string, Gopher>();

    constructor(private world: World, private participants: Map<string, VisualisationParticipant>) {
    }

    setup(): void {
    }

    update(dt: number): void {
        for (const key of this.entities.keys()) {
            // remove entity if related participant is not present in the current list of participants
            if (!this.participants.has(key)) {
                const entity = this.entities.get(key);
                this.world.removeEntity(entity);
                this.entities.delete(key);
            }
        }

        for (const [key, value] of this.participants.entries()) {
            // add entity if related entity is not present in the current list of entities
            if (!this.entities.has(key)) {
                const entity = this.newEntity();
                this.world.addEntity(entity);
                this.entities.set(key, entity);
            }

            // update properties
            const entity = this.entities.get(key);
            this.updateEntity(dt, entity, value);
        }
    }

    addEntity(): void {
    }

    removeEntity(): void {
    }

    private updateEntity(dt: number, entity: Gopher, state: VisualisationParticipant): void {
        // position
        const distance = entity.position.distance(state.position);
        const targetDirection = state.position.subtract(entity.position).normalise();
        const targetSpeed = targetDirection.multiply(this.getTargetSpeedValue(distance));
        const acceleration = targetSpeed.subtract(entity.speed).normalise().multiply(0.5);
        entity.speed = entity.speed.add(acceleration.multiply(dt));

        // name
        entity.render.text.text = state.name;

        // streams
        entity.streams.stream = state.stream;
    }

    private getTargetSpeedValue(distance: number): number {
         return this.min(1.2, distance * 0.8);
    }

    private min(a: number, b: number): number {
        if (a > b) {
            return b;
        } else {
            return a;
        }
    }

    private newEntity(): Gopher {
        return {
            position: new Vector(0, 0),
            speed: new Vector(0, 0),
            render: {
                sprite: Sprite.Gopher,
                text: {
                    text: '',
                },
            },
            streams: {
                stream: null,
            },
        };
    }

}
