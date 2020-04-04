import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Controller as ControllerModel } from '@/model/Controller';
import ContentHeader from '@/components/ContentHeader.vue';
import Boxes from '@/components/Boxes.vue';
import BoxesRow from '@/components/BoxesRow.vue';
import Box from '@/components/Box.vue';
import AppButton from '@/components/AppButton.vue';
import Notifications from '@/components/Notifications';
import MainLayoutContent from '@/components/MainLayoutContent.vue';
import MainLayout from '@/components/MainLayout.vue';
import Controller from '@/components/Controller.vue';
import Spinner from '@/components/Spinner.vue';
import { Device } from '@/model/Device';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        AppButton,
        MainLayout,
        MainLayoutContent,
        Controller,
        Spinner,
    },
})
export default class Controllers extends Vue {

    controllers: ControllerModel[] = null;

    private readonly apiService = new ApiService();

    created(): void {
        this.load();
    }

    addController(): void {
        this.$router.push('add-controller');
    }

    devicesChanged(i: number, devices: Device[]): void {
        this.controllers[i].devices = devices;
    }

    saveDevices(i: number): void {
        console.log('save');
    }

    private load(): void {
        this.apiService.listControllers()
            .then(
                response => {
                    const promises = [];
                    for (const controller of response.data) {
                        const promise = this.apiService.listControllerDevices(controller.uuid)
                            .then(
                                response => {
                                    controller.devices = response.data;
                                },
                                error => {
                                    Notifications.pushError(this, 'Could not load the controller devices.', error);
                                },
                            );
                        promises.push(promise);
                    }
                    Promise.all(promises)
                        .then(
                            _ => {
                                this.controllers = response.data;
                            },
                        );
                },
                error => {
                    Notifications.pushError(this, 'Could not load the controllers.', error);
                });
    }

}
