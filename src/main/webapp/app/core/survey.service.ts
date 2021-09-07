import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';
import {Answer, Answers} from '@/shared/model/answers.model';

export default class SurveyService {
  constructor(private store: Store<any>) {
    this.init();
  }

  public init(): void {
    this.get().then(res => {
      this.store.commit('setSurvey', res.data);
    });
  }

  public get(): AxiosPromise<any> {
    let surveyId = 2;
    return axios.get('api/survey/' + surveyId);
  }

  public getAnswer(userId, times): AxiosPromise<any> {
    return axios.get('api/survey/answer/' + userId + '/' + times);
  }

  public clearAnswer(userId, times): AxiosPromise<any> {
    return axios.post('api/survey/clear/' + userId + '/' + times);
  }

  public push(answers: Answers): Promise<any> {
    return axios.post('api/survey', answers);
  }
}
