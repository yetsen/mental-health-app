import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';
import { Answer } from '@/shared/model/answers.model';

export default class ChartService {
  constructor(private store: Store<any>) {

  }

  public get(userId, times): AxiosPromise<any> {
    return axios.get('api/chart/' + userId + '/' + times);
  }

  public getCompanyCharts(companyId, times): AxiosPromise<any> {
    return axios.get('api/chart/company/' + companyId + '/' + times);
  }

  public getBlockChart(blockId, userId, times): AxiosPromise<any> {
    return axios.get('api/chart/block/' + blockId + '/' + userId + '/' + times);
  }

  public getAllFormulaResults(userId): AxiosPromise<any> {
    return axios.get('/api/chart/formula-results/' + userId);
  }
}
