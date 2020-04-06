import { Component, Vue } from 'vue-property-decorator';
import AppWebcam from '@/components/AppWebcam.vue';


@Component({
    components: {
        AppWebcam,
    },
})
export default class Meet extends Vue {

}
