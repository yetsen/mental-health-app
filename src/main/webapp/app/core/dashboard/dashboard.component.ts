import Component from 'vue-class-component';
import {Inject, Watch} from 'vue-property-decorator';
import Vue from 'vue';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';
import ChartService from "@/core/chart.service";
import BubbleComponent from "@/core/dashboard/bubble/bubble.vue";

@Component({
  name: 'dashboard',
  components: {
    dummyComponent: DummyComponent,
    bubbleComponent: BubbleComponent
  },
})
export default class Dashboard extends Vue {
  @Inject('chartService')
  private chartService: () => ChartService;

  public chartList = [];

  public formulaResults = {};

  private times;

  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged(value: string, oldValue: string) {
    this.times = value['params'].times;
    if (this.isEmployer()) {
      // this.chartService().getCompanyCharts(this.companyId(), this.times).then(
      //     value => this.chartList = value.data
      // )
    } else {
       this.chartService().getAllFormulaResults(this.userId()).then(
           value => this.formulaResults = value.data
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
