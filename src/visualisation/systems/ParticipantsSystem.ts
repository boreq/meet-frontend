import { System } from '@/visualisation/ecs/System';
import { World } from '@/visualisation/ecs/World';
import { Gopher } from '@/visualisation/entities/Gopher';
import { Sprite } from '@/visualisation/Sprite';
import { VisualisationParticipant } from '@/components/AppVisualisation';

export class ParticipantsSystem implements System {

    private entities = new Map<string, Gopher>();

    constructor(private world: World, private participants: Map<string, VisualisationParticipant>) {
    }

    setup(): void {
    }

    update(): void {
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
                const entity = this.newGopher();
                this.world.addEntity(entity);
                this.entities.set(key, entity);
            }

            // update properties
            const entity = this.entities.get(key);
            entity.position = value.position;
            entity.render.text.text = value.name;
        }
    }

    addEntity(): void {
    }

    removeEntity(): void {
    }

    private newGopher(): Gopher {
        return {
            position: {
                x: 0,
                y: 0,
            },
            render: {
                sprite: Sprite.Gopher,
                text: {
                    text: '',
                },
            },
        };
    }

}
