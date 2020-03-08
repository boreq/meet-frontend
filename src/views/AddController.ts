import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import ContentHeader from '@/components/ContentHeader.vue';
import Boxes from '@/components/Boxes.vue';
import BoxesRow from '@/components/BoxesRow.vue';
import Box from '@/components/Box.vue';
import AppButton from '@/components/AppButton.vue';
import Notifications from '@/components/Notifications';
import FormInput from '@/components/FormInput.vue';
import { AddControllerCommand } from '@/model/AddControllerCommand';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        AppButton,
        FormInput,
    },
})
export default class AddController extends Vue {

    cmd = new AddControllerCommand();
    working = false;

    private readonly apiService = new ApiService();

    created(): void {
        this.load();
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        // ...
        this.working = true;
    }

    goToControllers(): void {
        this.$router.push('controllers');
    }

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors = [];

        if (!this.cmd.address) {
            errors.push('Address can not be empty.');
        }

        return errors;
    }

    private load(): void {
        this.apiService.listControllers()
            .then(
                response => {
                    // this.controllers = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not load the controllers.', error);
                });
    }

}
