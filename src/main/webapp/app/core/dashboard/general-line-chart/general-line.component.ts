import Component from 'vue-class-component';
import {Inject, Prop, Vue} from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import heatmap from "highcharts/modules/heatmap";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';


exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
heatmap(Highcharts);

@Component
export default class GeneralLineComponent extends Vue {

  @Prop()
  formulaResults: string;

  data() {

    return {
      chartOptions: {

        title: {
          text: 'All of Your Scores'
        },

        yAxis: {
          title: {
            text: 'Scores'
          },
          min: 0,
          max: 5,
          tickInterval: 1
        },

        xAxis: {
          categories: this.times(),
          title: {
            text: 'Months'
          }
        },

        series: this.seriesData()

      }
    };
  }

  times() {
    let results = this.formulaResults;
    return Object.keys(results["Well-Being"]);
  }

  seriesData() {
    let seriesData = [];


    let results = this.formulaResults;
    let times = Object.keys(results["Well-Being"]);
    let keys = Object.keys(results);
    keys.forEach(k => {
      let row = [];
      times.forEach(i => {
        if (results[k][i] <= 5)
          row.push(Number(results[k][i].toFixed(2)));
      })
      seriesData.push({
        name: k,
        data: row,
        visible: false
      })
    })
    return seriesData;

  }


}
