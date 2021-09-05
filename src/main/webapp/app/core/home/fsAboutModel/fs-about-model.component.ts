import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class FsAboutModelComponent extends Vue {

    private goTo(address : string) {
        this.$router.push(address);
    }
}
