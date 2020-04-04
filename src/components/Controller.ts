import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ContentHeader from '@/components/ContentHeader.vue';
import { Controller as ControllerModel } from '@/model/Controller';
import Boxes from '@/components/Boxes.vue';
import Box from '@/components/Box.vue';
import Devices from '@/components/Devices.vue';
import AppButton from '@/components/AppButton.vue';
import MainLayout from '@/components/MainLayout.vue';
import MainLayoutContent from '@/components/MainLayoutContent.vue';
import BoxContent from '@/components/BoxContent.vue';
import { Device } from '@/model/Device';


@Component({
    components: {
        ContentHeader,
        Boxes,
        Box,
        Devices,
        AppButton,
        MainLayout,
        MainLayoutContent,
        BoxContent,
    },
})
export default class Controller extends Vue {

    @Prop()
    controller: ControllerModel;

    changed: boolean = false;

    @Watch('controller')
    onUserChanged(controller: ControllerModel): void {
        this.changed = false;
    }

    onDevicesChanged(devices: Device[]): void {
        this.changed = true;
        this.$emit('devices-changed', devices);
    }
}

