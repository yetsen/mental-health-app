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
export default class ScatterLineWithMhComponent extends Vue {

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
          text: 'Mental Health, Employee Productivity and Business Productivity'
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
    seri['name'] = "Extremely Severe";
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
      let mh = results["Anxiety"];
      let ep = results["Employee Productivity"];
      let times = Object.keys(results["Anxiety"]);
      times.forEach(i => {
        if (mh[i] < 8)
          series[0]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else if (mh[i] < 10)
          series[1]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else if (mh[i] < 15)
          series[2]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else if (mh[i] < 20)
          series[3]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
        else
          series[4]["data"].push([Number(i), Number(ep[i].toFixed(2))]);
      });

      times = Object.keys(this.formulaResults["Business Productivity"]);
      times.forEach(i => {
        //TODO it will change after questions are provided
        series[5]["data"].push([Number(i), this.formulaResults["Business Productivity"][i]])
      })
    });

    return series;
  }


}
