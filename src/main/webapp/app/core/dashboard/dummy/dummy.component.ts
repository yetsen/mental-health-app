import Component from 'vue-class-component';
import {Prop, Vue} from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more'

exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
@Component
export default class DummyComponent extends Vue {
  @Prop()
  chartOptions: string;

  data() {
    return {
      chartOptionsObject: JSON.parse(JSON.parse(this.chartOptions))
    };
  }
}
