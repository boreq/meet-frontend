import { Component, Vue } from 'vue-property-decorator';

import { Visualisation } from '@/visualisation/Visualisation';

@Component({
    components: {},
})
export default class AppVisualisation extends Vue {

    mounted(): void {
        const container: HTMLElement = document.querySelector('#visualisation-canvas-container');
        const rect = container.getBoundingClientRect();

        const visualisation = new Visualisation();
        container.appendChild(visualisation.canvas());
        visualisation.resize(rect.width, rect.height);
    }

    destroyed(): void {
        // this.game.destroy(true);
    }
}
