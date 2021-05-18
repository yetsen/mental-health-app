import Component from 'vue-class-component';
import {Prop, Vue} from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import heatmap from "highcharts/modules/heatmap";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import JSONfn from 'json-fn/jsonfn.js';

exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
heatmap(Highcharts);
@Component
export default class DummyComponent extends Vue {
  @Prop()
  chartOptions: string;

  data() {
    let parsed = JSONfn.parse(JSONfn.parse(this.chartOptions))
    //console.log(parsed)
    return {
      chartOptionsObject: parsed
    };
  }
}
