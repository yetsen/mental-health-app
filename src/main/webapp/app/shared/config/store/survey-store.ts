import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
    surveyInformation: [],
    companySurveyInformation: {}
  },
  getters: {
    survey: state => state.survey,
    surveyInformation: state => state.surveyInformation,
    companySurveyInformation: state => state.companySurveyInformation
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
    setSurveyInformation(state, surveyInformation) {
      state.surveyInformation = surveyInformation;
    },
    setCompanySurveyInformation(state, companySurveyInformation) {
      state.companySurveyInformation = companySurveyInformation;
    }
  },
};
