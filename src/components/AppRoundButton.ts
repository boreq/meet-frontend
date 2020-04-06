import { Component, Prop, Vue } from 'vue-property-decorator';
import AppSpinner from '@/components/AppSpinner.vue';

@Component({
    components: {
        AppSpinner,
    },
})
export default class AppRoundButton extends Vue {

    @Prop()
    disabled: boolean;

    @Prop()
    working: boolean;

    onClick(event: MouseEvent): void {
        if (!this.disabled && !this.working) {
            this.$emit('click', event);
        }
    }

}
