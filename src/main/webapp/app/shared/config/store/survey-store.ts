import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
    surveyInformation: [],
    companySurveyInformation: {},
    employerSurvey: {}
  },
  getters: {
    survey: state => state.survey,
    surveyInformation: state => state.surveyInformation,
    companySurveyInformation: state => state.companySurveyInformation,
    employerSurvey: state => state.employerSurvey
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
    setEmployerSurvey(state, employerSurvey) {
      state.employerSurvey = employerSurvey;
    },
    setSurveyInformation(state, surveyInformation) {
      state.surveyInformation = surveyInformation;
    },
    setCompanySurveyInformation(state, companySurveyInformation) {
      state.companySurveyInformation = companySurveyInformation;
    }
  },
};
