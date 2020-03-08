import { Component, Prop, Vue } from 'vue-property-decorator';

import ContentHeader from '@/components/ContentHeader.vue';


@Component({
    components: {
        ContentHeader,
    },
})
export default class Box extends Vue {

    @Prop()
    text: string;

}
