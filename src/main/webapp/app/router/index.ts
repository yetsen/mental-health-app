import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router from 'vue-router';

const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');
const SurveyCard = () => import('@/core/survey/survey-card.vue');
const Dashboard = () => import('@/core/dashboard/dashboard.vue');
const Contact = () => import('@/core/home/teamVideos/team-videos.vue');
const AboutModel = () => import('@/core/home/aboutModel/about-model.vue');
import account from '@/router/account.ts';
import admin from '@/router/admin.ts';
import entities from '@/router/entities.ts';
import pages from '@/router/pages.ts';
import ContactComponent from "@/core/home/contact/contact.component";

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/survey/:times',
      name: 'SurveyCard',
      component: SurveyCard
    },
    {
      path: '/dashboard/:times',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/about-project',
      name: 'AboutProject',
      component: AboutModel
    },
    {
      path: '/consortium',
      name: 'Consortium',
      component: Dashboard
    },
    {
      path: '/contact-us',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    ...account,
    ...admin,
    ...entities,
    ...pages
  ]
});
