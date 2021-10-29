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
          text: 'Compare Your Monthly Scores'
        },

        yAxis: {
          title: {
            text: 'Score'
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
        plotOptions: {
          line: {
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
    let results = this.formulaResults;
    return Object.keys(results["Well-Being"]);
  }

  seriesData() {
    let seriesData = [{name:"Select All", data:[], visible:false },{name:"Deselect All", data: [], visible:false }];

    let exclude = ['Anxiety', 'Depression', 'Stress'];

    let results = this.formulaResults;
    let times = Object.keys(results["Well-Being"]);
    let keys = Object.keys(results);
    keys.forEach(k => {
      let row = [];
      times.forEach(i => {
        //console.log(k);
        if (!exclude.includes(k))
          row.push(Number(results[k][i].toFixed(2)));
      })
      if (!exclude.includes(k)) {
        seriesData.push({
          name: k,
          data: row,
          visible: false
        })
      }
    })
    return seriesData;

  }

}
