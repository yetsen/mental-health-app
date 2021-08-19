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

  private times;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.times) {
        vm.times = to.params.times;
        if (vm.isEmployer) {
          vm.chartService().getCompanyCharts(vm.companyId, vm.times).then(
              value => vm.chartList = value.data
          )
        } else {
          vm.chartService().get(vm.userId, vm.times).then(
              value => vm.chartList = value.data
          )
        }
      }
    });
  }

  mounted() {

  }

  public get userId() {
    return this.$store.getters.account ? this.$store.getters.account.id : '';
  }

  public get companyId() {
    return this.$store.getters.account ? this.$store.getters.account.companyId : '';
  }

  public get isEmployer() {
    return this.$store.getters.account ? this.$store.getters.account.isEmployer : '';
  }
}
