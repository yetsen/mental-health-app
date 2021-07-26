import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
    surveyInformation: []
  },
  getters: {
    survey: state => state.survey,
    surveyInformation: state => state.surveyInformation
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
    setSurveyInformation(state, surveyInformation) {
      state.surveyInformation = surveyInformation;
    }
  },
};
