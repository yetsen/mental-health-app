import Component from 'vue-class-component';
import {Inject, Vue} from 'vue-property-decorator';
import LoginService from "@/account/login.service";

@Component
export default class ProjectDescriptionComponent extends Vue {
    @Inject('loginService')
    private loginService: () => LoginService;

    public openLogin(): void {
        this.loginService().openLogin((<any>this).$root);
    }

    public get authenticated(): boolean {
        return this.$store.getters.authenticated;
    }
}
