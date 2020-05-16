import { Component, Vue } from 'vue-property-decorator';

import { Visualisation } from '@/visualisation/Visualisation';
import { Vector } from '@/visualisation/types/Vector';
import { VisualisationState } from '@/visualisation/VisualisationState';

export class VisualisationParticipant {
    name: string;
    position: Vector;
    stream: MediaStream;

    constructor(name: string, state: VisualisationState, stream: MediaStream) {
        this.name = name;
        this.position = state.position;
        this.stream = stream;
    }
}

@Component({
    components: {},
})
export default class AppVisualisation extends Vue {

    private visualisation = new Visualisation();

    mounted(): void {
        const container: HTMLElement = document.querySelector('#visualisation-canvas-container');
        const rect = container.getBoundingClientRect();

        container.appendChild(this.visualisation.canvas());
        this.visualisation.resize(rect.width, rect.height);
    }

    destroyed(): void {
        // this.game.destroy(true);
    }

    getState(): VisualisationState {
        return this.visualisation.getState();
    }

    setParticipants(participants: Map<string, VisualisationParticipant>): void {
        if (participants) {
            this.visualisation.setParticipants(participants);
        }
    }

}
