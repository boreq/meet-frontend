import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class ContentHeader extends Vue {

    @Prop()
    text: string;

}
