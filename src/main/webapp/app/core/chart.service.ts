import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';
import { Answer } from '@/shared/model/answer.model';

export default class ChartService {
  constructor(private store: Store<any>) {

  }

  public get(userId): AxiosPromise<any> {
    return axios.get('api/chart/' + userId);
  }

  public getCompanyCharts(companyId): AxiosPromise<any> {
    return axios.get('api/chart/company/' + companyId);
  }

}
