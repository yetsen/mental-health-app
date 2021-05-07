import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
  },
  getters: {
    survey: state => state.survey,
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
  },
};
