import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';
import {Answer, Answers} from '@/shared/model/answers.model';

export default class SurveyService {
  constructor(private store: Store<any>) {
    this.init();
  }

  public init(): void {
    this.get(2).then(res => {
      this.store.commit('setSurvey', res.data);
    });
    this.get(3).then(res => {
      this.store.commit('setEmployerSurvey', res.data);
    });
  }

  public get(surveyId): AxiosPromise<any> {
    return axios.get('api/survey/' + surveyId);
  }

  public getAnswer(userId, times, surveyId): AxiosPromise<any> {
    return axios.get('api/survey/answer/' + userId + '/' + times + '/' + surveyId);
  }

  public clearAnswer(userId, times, surveyId): AxiosPromise<any> {
    return axios.post('api/survey/clear/' + userId + '/' + times + '/' + surveyId);
  }

  public push(answers: Answers): Promise<any> {
    return axios.post('api/survey', answers);
  }
}
