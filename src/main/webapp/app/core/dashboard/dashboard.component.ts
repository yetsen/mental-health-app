import Component from 'vue-class-component';
import {Inject, Vue} from 'vue-property-decorator';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';
import ChartService from "@/core/chart.service";

@Component({
  components: {
    dummyComponent: DummyComponent,
  },
})
export default class Dashboard extends Vue {
  @Inject('chartService')
  private chartService: () => ChartService;

  public chartList = [];

  mounted() {
    this.chartService().get(this.userId()).then(
        value => this.chartList = value.data
    )
  }

  userId() {
    return this.$store.getters.account.id;
  }
}
