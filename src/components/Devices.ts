import { Component, Prop, Vue } from 'vue-property-decorator';

import Schedule from '@/components/Schedule.vue';
import { Device } from '@/model/Device';


@Component({
    components: {
        Schedule,
    },
})
export default class Devices extends Vue {

    @Prop()
    devices: Device[];

}
