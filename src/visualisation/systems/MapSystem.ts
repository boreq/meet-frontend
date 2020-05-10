import { System } from '@/visualisation/ecs/System';
import { World } from '@/visualisation/ecs/World';
import { WorldMap } from '@/visualisation/WorldMap';
import { Tile } from '@/visualisation/entities/Tile';
import { Vector } from '@/visualisation/types/Vector';

export class MapSystem implements System {

    constructor(private map: WorldMap, private world: World) {
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

    update(): void {
    }

    addEntity(): void {
    }

    removeEntity(): void {
    }

}
