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
export default class EmployerBubbleComponent extends Vue {

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
          type: 'bubble'
        },


        title: {
          text: 'Mental Health, Job satisfaction and Employee Productivity'
        },

        xAxis: {
          title: {
            text: 'Months'
          },
          type: 'category',
          allowDecimals: false
        },

        yAxis: {
          title: {
            text: 'Job Satisfaction'
          },
          min: 0,
          max: 5,
          tickInterval: 1
        },

        tooltip: {
          useHTML: true,
          headerFormat: '<table>',
          pointFormat: '<tr><th>Job Satisfaction:</th><td>{point.y}</td></tr>' +
              '<tr><th>Organisational Commitment:</th><td>{point.z}</td></tr>',
          footerFormat: '</table>',
          followPointer: true
        },

        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          },
          bubble: {
            minSize: 30,
            maxSize: 50
          }
        },
        legend: {
          enabled: true
        },

        series: this.series()

      }
    };
  }

  series() {
    let series = [];
    let seri = {};

    seri['name'] = "Normal";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Mild";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Moderate";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Severe";
    seri['data'] = [];
    series.push(seri);

    let allResults = this.companyFormulaResults;
    allResults.forEach(results => {
      let mh = results["Mental Health"];
      let js = results["Job Satisfaction"];
      let oc = results["Organisational Commitment"];
      let times = Object.keys(results["Mental Health"]);
      times.forEach(i => {
        let coord = {};
        coord['x'] = Number(i);
        coord['y'] = Number(js[i].toFixed(2));
        coord['z'] = Number(oc[i].toFixed(2));
        if (mh[i] <= 2)
          series[0]["data"].push(coord);
        else if (mh[i] <= 3)
          series[1]["data"].push(coord);
        else if (mh[i] <= 4)
          series[2]["data"].push(coord);
        else if (mh[i] <= 5)
          series[3]["data"].push(coord);
      });
    });


    return series;

  }


}
