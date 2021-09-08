import Component from 'vue-class-component';
import {Inject, Watch} from 'vue-property-decorator';
import Vue from 'vue';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';
import ChartService from "@/core/chart.service";
import BubbleWithMhComponent from "@/core/dashboard/bubble-with-mh/bubble-with-mh.vue";
import BubbleWithWbComponent from "@/core/dashboard/bubble-with-wb/bubble-with-wb.vue";
import BoxPlotComponent from "@/core/dashboard/box-plot/box-plot.vue";
import SyncWithEpComponent from "@/core/dashboard/sync-with-ep/sync-with-ep.vue";
import SyncWithJsComponent from "@/core/dashboard/sync-with-js/sync-with-js.vue";

@Component({
  name: 'dashboard',
  components: {
    dummyComponent: DummyComponent,
    bubbleWithMhComponent: BubbleWithMhComponent,
    bubbleWithWbComponent: BubbleWithWbComponent,
    boxPlot : BoxPlotComponent,
    syncWithEp: SyncWithEpComponent,
    syncWithJs: SyncWithJsComponent
  },
})
export default class Dashboard extends Vue {
  @Inject('chartService')
  private chartService: () => ChartService;

  public chartList = [];

  public formulaResults = {};

  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged(value: string, oldValue: string) {
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
