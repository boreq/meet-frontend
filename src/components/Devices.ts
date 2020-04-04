import { Component, Prop, Vue } from 'vue-property-decorator';

import Schedule from '@/components/Schedule.vue';
import { Device } from '@/model/Device';
import { Period } from '@/model/Period';


@Component({
    components: {
        Schedule,
    },
})
export default class Devices extends Vue {

    @Prop()
    devices: Device[];

    scheduleChanged(index, schedule: Period[]) {
        this.devices[index].schedule = schedule;
        this.$emit('change', this.devices);
    }

}
