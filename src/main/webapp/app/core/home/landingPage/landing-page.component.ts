import Component from 'vue-class-component';
import {Inject, Vue, Watch} from 'vue-property-decorator';
import LoginService from "@/account/login.service";

@Component
export default class LandingPageComponent extends Vue {
    @Inject('loginService')
    private loginService: () => LoginService;

    public get blocks() {
        return this.isEmployer ? this.$store.getters.employerSurvey.pages : this.$store.getters.survey.pages;
    }

    public get isEmployer() {
        return this.$store.getters.account ? this.$store.getters.account.isEmployer : '';
    }

    public get authenticated(): boolean {
        return this.$store.getters.authenticated;
    }

    public get buttonStyle() {
        return this.isEmployer ? "style='margin-top: 5vh'" : "style='margin-top: -10vh'";
    }

    public openLogin(): void {
        this.loginService().openLogin((<any>this).$root);
    }

    public get surveyInformation() {
        return this.$store.getters.surveyInformation;
    }

    public get currentTime() {
        if (this.surveyInformation.length === 0)
            return 1;

        if (this.surveyInformation[this.surveyInformation.length - 1].finished)
            return this.surveyInformation[this.surveyInformation.length - 1].times + 1;

        return this.surveyInformation[this.surveyInformation.length - 1].times;
    }

    private onAssessmentClick(): void {
        //TODO: remove it
        if (this.authenticated) {
            this.$router.push('/survey/' + this.currentTime);
        } else {
            this.openLogin();
        }
    }
}
