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
    console.log(JSONfn.stringify({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'bar chart'
      },
      xAxis: [{
        categories: [
          'Work to Family Conflict', 'Techno-Overload', 'Support from Supervisor'
        ],
        reversed: false,
        labels: {
          step: 1
        },
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: [
          'Family to Work Conflict', 'Techno-Complexity', 'Support from Coworkers'
        ],
        linkedTo: 0,
        labels: {
          step: 1
        },
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          }
        }
      },
      legend: {
        enabled: false
      },

      tooltip: {
        formatter: function () {
          return Math.abs(this.point.y);
        }
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },

      series: [{
        name: 'Value',
        data: [
          -2.2, -2.1, -2.2
        ]
      }, {
        name: 'Value',
        data: [
          2.1, 2.0, 2.1
        ]
      }]
    }))
    return {
      chartOptionsObject: JSONfn.parse(JSONfn.parse(this.chartOptions))
    };
  }
}
