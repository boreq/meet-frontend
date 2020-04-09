import { System } from '@/visualisation/ecs/System';
import { Entity } from '@/visualisation/ecs/Entity';
import { World } from '@/visualisation/ecs/World';
import { Map } from '@/visualisation/Map';
import { Tile } from '@/visualisation/entities/Tile';
import { Vector } from '@/visualisation/types/Vector';

export class MapSystem implements System {

    constructor(private map: Map, private world: World) {
    }

    setup(): void {
        for (let i = 0; i < this.map.tiles.length; i++) {
            for (let j = 0; j < this.map.tiles[i].length; j++) {
                const sprite = this.map.tiles[j][i];

                const tile: Tile = {
                    position: new Vector(i, j),
                    render: {
                        sprite: sprite,
                    },
                };
                this.world.addEntity(tile);
            }
        }
    }

    update(dt: number): void {
    }

    addEntity(): void {
    }

    removeEntity(): void {
    }

}
