import { Component, Vue } from 'vue-property-decorator';

import MainHeader from '@/components/MainHeader.vue';
import MainMenu from '@/components/MainMenu.vue';
import Notifications from '@/components/Notifications.vue';


@Component({
    components: {
        MainHeader,
        MainMenu,
        Notifications,
    },
})
export default class App extends Vue {
}
