import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Controller } from '@/model/Controller';
import ContentHeader from '@/components/ContentHeader.vue';
import Boxes from '@/components/Boxes.vue';
import BoxesRow from '@/components/BoxesRow.vue';
import Box from '@/components/Box.vue';
import Devices from '@/components/Devices.vue';
import AppButton from '@/components/AppButton.vue';
import Notifications from '@/components/Notifications';
import MainLayoutContent from '@/components/MainLayoutContent.vue';
import MainLayout from '@/components/MainLayout.vue';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        Devices,
        AppButton,
        MainLayout,
        MainLayoutContent,
    },
})
export default class Controllers extends Vue {

    controllers: Controller[] = null;

    private readonly apiService = new ApiService();

    created(): void {
        this.load();
    }

    addController(): void {
        this.$router.push('add-controller');
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
