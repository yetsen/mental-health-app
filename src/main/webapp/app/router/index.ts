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
const Consortium = () => import('@/core/home/consortium/consortium.vue');
const WorkPackage = () => import('@/core/work-package/work-package.vue');
const LandingPage = () => import('@/core/home/landingPage/landing-page.vue');
import account from '@/router/account.ts';
import admin from '@/router/admin.ts';
import entities from '@/router/entities.ts';
import pages from '@/router/pages.ts';
import {Authority} from "@/shared/security/authority";

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
      component: SurveyCard,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/landing-page',
      name: 'LandingPage',
      component: LandingPage,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/work-package/:number',
      name: 'WorkPackage',
      component: WorkPackage
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
