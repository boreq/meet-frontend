import { System } from '@/visualisation/ecs/System';
import { Camera } from '@/visualisation/entities/Camera';
import { Participant } from '@/visualisation/entities/Participant';

export class CameraSystem implements System {

    constructor(private camera: Camera, private participant: Participant) {
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
