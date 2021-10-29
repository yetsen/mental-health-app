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
export default class ScatterLineWithWbComponent extends Vue {

  @Prop()
  formulaResults: string;
  @Prop()
  companyFormulaResults: string[];

  data() {

    return {
      chartOptions: {
        chart: {
          type: 'scatter'
        },
        title: {
          text: 'Well-Being, Employee Productivity and Business Productivity'
        },
        plotOptions: {
          series: {
            marker: {
              symbol: 'circle'
            }
          }
        },
        xAxis: {
          title: {
            enabled: true,
            text: 'Months'
          },
          type: 'category',
          min: 1
        },
        yAxis: {
          title: {
            text: 'Productivity'
          },
          min: 0,
          max: 5,
          tickInterval: 1
        },
        series: this.seriesData()
      }
    };
  }

  seriesData() {
    let series = [];
    let seri = {};

    seri['name'] = "Normal";
    seri['data'] = [];
    seri['tooltip'] = {
      pointFormat: 'Employee Productivity: <strong>{point.y}<strong/><br/>'
    }
    series.push(seri);
    seri = {};
    seri['name'] = "Mild";
    seri['data'] = [];
    seri['tooltip'] = {
      pointFormat: 'Employee Productivity: <strong>{point.y}<strong/><br/>'
    }
    series.push(seri);
    seri = {};
    seri['name'] = "Moderate";
    seri['data'] = [];
    seri['tooltip'] = {
      pointFormat: 'Employee Productivity: <strong>{point.y}<strong/><br/>'
    }
    series.push(seri);
    seri = {};
    seri['name'] = "Severe";
    seri['data'] = [];
    seri['tooltip'] = {
      pointFormat: 'Employee Productivity: <strong>{point.y}<strong/><br/>'
    }
    series.push(seri);
    seri = {};
    seri['name'] = "Business Productivity";
    seri['data'] = [];
    seri['type'] = 'spline'
    series.push(seri);

    let allResults = this.companyFormulaResults;
    allResults.forEach(results => {
      let wb = results["Well-Being"];
      let ep = results["Employee Productivity"];
      let times = Object.keys(results["Mental Health"]);
      times.forEach(i => {
        if (wb[i] <= 2)
          series[0]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else if (wb[i] <= 3)
          series[1]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else if (wb[i] <= 4)
          series[2]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else
          series[3]["data"].push([Number(i), Number(ep[i].toFixed(2))]);

      });


      times = Object.keys(this.formulaResults["Business Productivity"]);
      times.forEach(i => {
        //TODO it will change after questions are provided
        series[4]["data"].push([Number(i), this.formulaResults["Business Productivity"][i]])
      })
    });

    return series;
  }


}
