import { Component, Vue } from 'vue-property-decorator';
import AppNotifications from '@/components/AppNotifications.vue';


@Component({
    components: {
        AppNotifications,
    },
})
export default class App extends Vue {
}
