import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';
import CosieNavbar from "@/core/cosie-navbar/cosie-navbar.vue";
import ArshaNavbar from "@/core/arsha-navbar/arsha-navbar.vue";
import Hero from "@/core/hero/hero.vue";

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'cosie-navbar': CosieNavbar,
    'arsha-navbar': ArshaNavbar,
    'login-form': LoginForm,
    'jhi-footer': JhiFooter,
    'hero': Hero
  },
})
export default class App extends Vue {}
