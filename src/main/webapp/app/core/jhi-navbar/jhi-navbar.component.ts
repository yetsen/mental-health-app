import { Component, Inject, Vue } from 'vue-property-decorator';
import { VERSION } from '@/constants';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

@Component
export default class JhiNavbar extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('translationService') private translationService: () => TranslationService;

  @Inject('accountService') private accountService: () => AccountService;
  public version = VERSION ? 'v' + VERSION : '';
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;
  private hasAnyAuthorityValue = false;
  private scrollPosition = 0;

  created() {
    this.translationService().refreshTranslation(this.currentLanguage);
    this.hasAnyAuthority('ROLE_USER');
  }

  public subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }

  public changeLanguage(newLanguage: string): void {
    this.translationService().refreshTranslation(newLanguage);
  }

  public isActiveLanguage(key: string): boolean {
    return key === this.$store.getters.currentLanguage;
  }

  public logout(): void {
    this.loginService()
      .logout()
      .then(response => {
        this.$store.commit('logout');
        this.$router.push('/');
      });
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get surveyInformation() {
    return this.$store.getters.surveyInformation;
  }

  public get companySurveyInformation() {
    return this.$store.getters.companySurveyInformation;
  }

  public get companyAvailableTimeList() {
    return Object.keys(this.companySurveyInformation).filter(key => this.companySurveyInformation[key].some(val => val.finished));
  }

  public get isEmployer() {
    return this.$store.getters.account ? this.$store.getters.account.isEmployer : '';
  }

  public get currentTime() {
    return this.surveyInformation.length === 0 ? 1 :
        this.surveyInformation[this.surveyInformation.length - 1].times + 1;
  }

  public get isLastSurveyFinished() : boolean {
    return this.surveyInformation.length === 0 ? true :
        this.surveyInformation[this.surveyInformation.length - 1].finished;
  }

  private onAssessmentClick(times): void {
    //TODO: remove it
    if (this.authenticated) {
      this.$router.push('/survey/' + times);
    } else {
      this.openLogin();
    }
  }

  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValue = value;
      });
    return this.hasAnyAuthorityValue;
  }

  public get swaggerEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('swagger') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }

  public isInHomePage(): boolean {
    return this.$route.name === 'Home';
  }

  public updateScroll() {
    this.scrollPosition = window.scrollY;
  }

  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
