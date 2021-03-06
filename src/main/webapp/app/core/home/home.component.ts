import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AboutModel from '@/core/home/aboutModel/about-model.vue';
import FsAboutModel from '@/core/home/fsAboutModel/fs-about-model.vue';
import TeamVideos from '@/core/home/teamVideos/team-videos.vue';
import ProjectDescription from '@/core/home/project-description/project-description.vue';
import Contact from '@/core/home/contact/contact.vue';
import FsConsortium from "@/core/home/fsConsortium/fsConsortium.vue";
import FsContact from "@/core/home/fsContact/fsContact.vue";
import Hero from "@/core/hero/hero.vue";

@Component({
  components: {
    aboutModel: AboutModel,
    teamVideos: TeamVideos,
    projectDescription: ProjectDescription,
    contact: Contact,
    fsAboutModel: FsAboutModel,
    fsConsortium: FsConsortium,
    fsContact: FsContact,
    'hero': Hero

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
