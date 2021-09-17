import Component from 'vue-class-component';
import {Inject, Prop, Vue} from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import heatmap from "highcharts/modules/heatmap";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import AccountService from "@/account/account.service";


exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
heatmap(Highcharts);

@Component
export default class EmployerCurrentHorizontalBarChartComponent extends Vue {

  @Prop()
  formulaResults: string;
  @Prop()
  companyFormulaResults: string[];

  data() {
    //console.log(parsed)
    //console.log(JSONfn.stringify())



    return {
      chartOptions: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'General Score'
        },
        plotOptions: {
          series: {
            colorByPoint: true
          }
        },
        legend: {
          enabled: false
        },
        xAxis: {
          categories: this.categories(),
        },
        yAxis: {
          min: 0,
          max: 5,
          title: {
            text: 'Score'
          },
          labels: {
            overflow: 'justify'
          }
        },
        series: [{
          name: 'Scores',
          data: this.currentOtherResults()
        }]
      }
    };
  }

  categories() {
    let exclude = ['Anxiety', 'Depression', 'Stress', 'Well-Being'];
    return Object.keys(this.companyFormulaResults[0]).filter(value => !exclude.includes(value));
  }

  currentOtherResults() {

    let allResults = this.companyFormulaResults;
    let categories = this.categories();
    let result = new Array(categories.length);
    allResults.forEach(results => {
      let times = Object.keys(results[categories[0]]);
      let currentTime = times[times.length - 1];
      categories.forEach((cat, i) => {
        if (!result[i])
          result[i] = 0;
        result[i] += results[cat][currentTime]
      })
    });
    let userCount = allResults.length;
    result = result.map(value => Number((value/userCount).toFixed(2)));
    return result;
  }


}
