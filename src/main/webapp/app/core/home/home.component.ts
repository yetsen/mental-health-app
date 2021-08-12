import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AboutModel from '@/core/home/aboutModel/about-model.vue';
import TeamVideos from '@/core/home/teamVideos/team-videos.vue';
import ProjectDescription from '@/core/home/project-description/project-description.vue';
import Contact from '@/core/home/contact/contact.vue';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

@Component({
  components: {
    aboutModel: AboutModel,
    teamVideos: TeamVideos,
    projectDescription: ProjectDescription,
    contact: Contact,
    VueSlickCarousel
  },
})
export default class Home extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
