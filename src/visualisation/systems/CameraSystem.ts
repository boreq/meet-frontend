import { System } from '@/visualisation/ecs/System';
import { Camera } from '@/visualisation/entities/Camera';
import { Gopher } from '@/visualisation/entities/Gopher';

export class CameraSystem implements System {

    constructor(private camera: Camera, private participant: Gopher) {
    }

    setup(): void {
    }

    update(): void {
        this.camera.position.x = this.participant.position.x;
        this.camera.position.y = this.participant.position.y;
    }

    addEntity(): void {
    }

    removeEntity(): void {
    }

}
