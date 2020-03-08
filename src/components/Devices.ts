import { Component, Vue } from 'vue-property-decorator';

import Schedule from '@/components/Schedule.vue';


@Component({
    components: {
        Schedule,
    },
})
export default class Devices extends Vue {

    devices = ['Light 1', 'Light 2', 'Air pump 1', 'Air pump 2', 'Water pump 1', 'Water pump 2'];
    icons = ['far fa-lightbulb', 'far fa-lightbulb', 'fas fa-fan', 'fas fa-fan', 'fas fa-tint', 'fas fa-tint'];

}
