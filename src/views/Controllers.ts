import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Controller } from '@/model/Controller';
import ContentHeader from '@/components/ContentHeader.vue';
import Boxes from '@/components/Boxes.vue';
import BoxesRow from '@/components/BoxesRow.vue';
import Box from '@/components/Box.vue';
import Devices from '@/components/Devices.vue';
import Notifications from '@/components/Notifications';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        Devices,
    },
})
export default class Controllers extends Vue {

    controllers: Controller[] = null;

    private readonly apiService = new ApiService();

    created(): void {
        this.load();
    }

    private load(): void {
        this.apiService.listControllers()
            .then(
                response => {
                    this.controllers = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not load the controllers.', error);
                });
    }

}
