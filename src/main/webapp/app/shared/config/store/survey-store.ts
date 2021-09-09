import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
    surveyInformation: [],
    companySurveyInformation: {},
    employerSurvey: {"title":"Mental Health Assessment","showProgressBar":"top","pages":[{"id":40,"name":"Introduction","title":"","description":"","chartId":null},{"id":41,"name":"Business Productivity","title":"","description":"","chartId":null},{"id":42,"name":"Green Management","title":"","description":"","chartId":null}]}
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
    setSurveyInformation(state, surveyInformation) {
      state.surveyInformation = surveyInformation;
    },
    setCompanySurveyInformation(state, companySurveyInformation) {
      state.companySurveyInformation = companySurveyInformation;
    }
  },
};
