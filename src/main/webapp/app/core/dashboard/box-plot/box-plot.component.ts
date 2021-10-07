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
export default class BoxPlotComponent extends Vue {

  @Prop()
  formulaResults: string;
  @Prop()
  companyFormulaResults: string[];

  data() {

    return {
      chartOptions: {

        chart: {
          type: 'boxplot'
        },

        title: {
          text: "All of The Company's Scores"
        },

        xAxis: {
          categories: this.times(),
          title: {
            text: 'Months'
          }
        },

        yAxis: {
          title: {
            text: 'Score'
          },
          min: 0,
          max: 5,
          tickInterval: 1
        },
        plotOptions: {
          boxplot: {
            events: {
              legendItemClick: function (col) {
                console.log(col);
                if (col.target.index === 0) {
                  this.chart.series.forEach(function(val, index){
                    if (index !== 0 || index !== 1) {
                      val.setVisible(true, true);
                    }
                  });
                  return false;
                }
                if (col.target.index === 1) {
                  this.chart.series.forEach(function(val, index){
                    if (index !== 0 || index !== 1) {
                      val.setVisible(false, false);
                    }
                  });
                  return false;
                }
              }
            }
          }
        },
        legend: {
          enabled:true
        },
        series: this.seriesData()
      }
    };
  }

  times() {
    let results = this.companyFormulaResults;
    return Object.keys(results[0]["Well-Being"]);
  }

  seriesData() {
    let seriesData = [{name:"Select All", data:[], type: '', tooltip: {headerFormat: ''},visible:false },{name:"Deselect All", data: [], type: '', tooltip: {headerFormat: ''}, visible:false }];


    let results = this.companyFormulaResults;
    let times = Object.keys(results[0]["Well-Being"]);
    let keys = Object.keys(results[0]);
    keys.forEach(k => {
      let data = {
        name: k,
        data: [],
        type: 'boxplot',
        tooltip: {
          headerFormat: '<em>Assessment {point.key}</em><br/>'
        },
        visible: true
      }
      times.forEach(i => {
        let row = [];
        results.forEach(result => {
          if (result[k][i] <= 5)
            row.push(Number(result[k][i].toFixed(2)));
        })
        row.sort();
        let median = row.length % 2 == 1 ? row[Math.floor(row.length/2)] : (row[row.length/2] + row[row.length/2 - 1])/2;
        let ql = row[Math.floor(row.length/4)];
        let qu = row[Math.floor(row.length*3/4)];
        data['data'].push([
          row[0],
          ql,
          median,
          qu,
          row[row.length - 1]
        ]);
      })
      if (k != 'Anxiety' && k != 'Stress' && k != 'Depression')
        seriesData.push(data);
    })
    console.log(seriesData);
    return seriesData;

  }


}
