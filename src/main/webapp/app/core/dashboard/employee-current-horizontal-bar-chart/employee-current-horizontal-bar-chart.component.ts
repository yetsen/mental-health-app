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
export default class EmployeeCurrentHorizontalBarChartComponent extends Vue {

  @Prop()
  formulaResults: string;

  data() {
    //console.log(parsed)
    //console.log(JSONfn.stringify())



    return {
      chartOptions: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'General Scores'
        },
        plotOptions: {
          series: {
            color: '#043c5d'
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
          data: this.currentOtherResults(),
        }]
      }
    };
  }

  categories() {
    let exclude = ['Anxiety', 'Depression', 'Stress', 'Well-Being'];
    return Object.keys(this.formulaResults).filter(value => !exclude.includes(value));
  }

  currentOtherResults() {
    let times = Object.keys(this.formulaResults['Anxiety']);
    let currentTime = times[times.length - 1];
    let categories = this.categories();
    let result = [];
    categories.forEach(value => {
      result.push(Number(this.formulaResults[value][currentTime].toFixed(2)));
    })
    return result;
  }


}
