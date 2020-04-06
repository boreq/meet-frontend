import { Component, Vue } from 'vue-property-decorator';
import AppWhoAmI from '@/components/AppWhoAmI.vue';
import AppButton from '@/components/AppButton.vue';


@Component({
    components: {
        AppWhoAmI,
        AppButton,
    },
})
export default class Create extends Vue {

    created(): void {
    }

    destroyed(): void {
    }

    create(): void {
        this.$router.push({name: 'meet', params: {id: '123'}});
    }

}
