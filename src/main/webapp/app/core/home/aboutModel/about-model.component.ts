import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class AboutModelComponent extends Vue {
    openReadMoreChart(): void {
        if (<any>this.$refs.readMoreChart) {
            (<any>this.$refs.readMoreChart).show();
        }
    }
    openReadMoreChart2(): void {
        if (<any>this.$refs.readMoreChart2) {
            (<any>this.$refs.readMoreChart2).show();
        }
    }
    openReadMoreChart3(): void {
        if (<any>this.$refs.readMoreChart3) {
            (<any>this.$refs.readMoreChart3).show();
        }
    }
    openReadMoreChart4(): void {
        if (<any>this.$refs.readMoreChart4) {
            (<any>this.$refs.readMoreChart4).show();
        }
    }
}
