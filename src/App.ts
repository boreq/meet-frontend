import { Component, Vue } from 'vue-property-decorator';

import MainHeader from '@/components/MainHeader.vue';
import MainMenu from '@/components/MainMenu.vue';


@Component({
    components: {
        MainHeader,
        MainMenu,
    },
})
export default class App extends Vue {
}
