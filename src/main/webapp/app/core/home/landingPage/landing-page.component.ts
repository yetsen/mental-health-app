import Component from 'vue-class-component';
import {Inject, Vue, Watch} from 'vue-property-decorator';
import LoginService from "@/account/login.service";

@Component
export default class LandingPageComponent extends Vue {
    @Inject('loginService')
    private loginService: () => LoginService;
    public times;

    @Watch('$route', { immediate: true, deep: true })
    onPropertyChanged(value: string, oldValue: string) {
        if (this.times === value['params'].times)
            return;
        this.times = value['params'].times;
    }

    public get blocks() {
        return this.$store.getters.survey.pages.slice(0,10);
    }


    public get authenticated(): boolean {
        return this.$store.getters.authenticated;
    }

    public openLogin(): void {
        this.loginService().openLogin((<any>this).$root);
    }

    private onAssessmentClick(): void {
        //TODO: remove it
        if (this.authenticated) {
            this.$router.push('/survey/' + this.times);
        } else {
            this.openLogin();
        }
    }
}
