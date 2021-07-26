import { Module } from 'vuex';

export const surveyStore: Module<any, any> = {
  state: {
    survey: {},
    times: []
  },
  getters: {
    survey: state => state.survey,
    times: state => state.times
  },
  mutations: {
    setSurvey(state, survey) {
      state.survey = survey;
    },
    setTimes(state, times) {
      state.times = times;
    }
  },
};
