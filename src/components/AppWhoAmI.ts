import { Component, Vue } from 'vue-property-decorator';
import AppInput from '@/components/AppInput.vue';
import AppRoundButton from '@/components/AppRoundButton.vue';
import AppWebcam from '@/components/AppWebcam.vue';

@Component({
    components: {
        AppInput,
        AppRoundButton,
        AppWebcam,
    },
})
export default class AppWhoAmI extends Vue {

}
