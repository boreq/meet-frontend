import { Component, Vue } from 'vue-property-decorator';
import AppWebcam from '@/components/AppWebcam.vue';
import AppVisualisation from '@/components/AppVisualisation.vue';

@Component({
    components: {
        AppWebcam,
        AppVisualisation,
    },
})
export default class Meet extends Vue {

}
