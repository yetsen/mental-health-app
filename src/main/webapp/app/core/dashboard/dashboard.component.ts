import Component from 'vue-class-component';
import {Inject, Watch} from 'vue-property-decorator';
import Vue from 'vue';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';
import ChartService from "@/core/chart.service";

@Component({
  name: 'dashboard',
  components: {
    dummyComponent: DummyComponent,
  },
})
export default class Dashboard extends Vue {
  @Inject('chartService')
  private chartService: () => ChartService;

  public chartList = [];

  private times;

  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged(value: string, oldValue: string) {
    this.times = value['params'].times;
    if (this.isEmployer()) {
      this.chartService().getCompanyCharts(this.companyId(), this.times).then(
          value => this.chartList = value.data
      )
    } else {
      this.chartService().get(this.userId(), this.times).then(
          value => this.chartList = value.data
      )
    }
  }

  userId() {
    return this.$store.getters.account.id;
  }

  companyId() {
    return this.$store.getters.account.companyId;
  }

  isEmployer() {
    return this.$store.getters.account.isEmployer;
  }
}
