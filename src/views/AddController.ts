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
import MainLayout from '@/components/MainLayout.vue';
import MainLayoutContent from '@/components/MainLayoutContent.vue';
import BoxContent from '@/components/BoxContent.vue';


@Component({
    components: {
        ContentHeader,
        Boxes,
        BoxesRow,
        Box,
        AppButton,
        FormInput,
        MainLayout,
        MainLayoutContent,
        BoxContent,
    },
})
export default class AddController extends Vue {

    cmd = new AddControllerCommand();
    working = false;

    private readonly apiService = new ApiService();

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;
        this.apiService.addController(this.cmd)
            .then(
                () => {
                    Notifications.pushSuccess(this, 'Controller added.')
                    this.goToControllers();
                },
                error => {
                    Notifications.pushError(this, 'Could not add a controller.', error);
                },
            ).finally(
            () => {
                this.working = false;
            });
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
}
