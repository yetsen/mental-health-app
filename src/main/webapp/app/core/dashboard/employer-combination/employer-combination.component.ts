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
export default class EmployerCombinationComponent extends Vue {

  @Prop()
  formulaResults: string;
  @Prop()
  companyFormulaResults: string[];

  data() {

    return {
      chartOptions: {
        title: {
          text: 'MH - JS - OC - WB - EP - BP'
        },
        subtitle: {
          text: 'Mental Health - Job satisfaction - Org Commitment - Well-Being - Employee Productivity - Business Productivity'
        },
        xAxis: {
          categories: this.times(),
          title: {
            text: 'Months'
          },
          allowDecimals: false
        },
        series: this.seriesData()
      }
    };
  }


  times() {
    let results = this.companyFormulaResults;
    let max = Object.keys(this.formulaResults["Business Productivity"]).length;
    results.forEach(res => {
      max = Math.max(max, Object.keys(res["Well-Being"]).length);
    });
    return Array.from({length: max}, (_, i) => i + 1);
  }

  seriesData() {
    let series = [];
    let seri = {};

    seri['name'] = "Mental Health";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#043c5d'
    series.push(seri);
    seri = {};
    seri['name'] = "Job Satisfaction";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#17788d'
    series.push(seri);
    seri = {};
    seri['name'] = "Well-Being";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#0884cd'
    series.push(seri);
    seri = {};
    seri['name'] = "Organizational Commitment";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#23b6d6'
    series.push(seri);
    seri = {};
    seri['name'] = "Employee Productivity";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#3cb4c4'

    series.push(seri);
    seri = {};
    seri['name'] = "Business Productivity";
    seri['type'] = "column";
    seri['data'] = [];
    seri['color'] = '#94eff3'
    series.push(seri);
    seri = {};
    seri['name'] = "Average";
    seri['data'] = [];
    seri['type'] = 'spline'
    series.push(seri);

    let allResults = this.companyFormulaResults;
    allResults.forEach(results => {
      let mh = results["Anxiety"];
      let js = results["Job Satisfaction"];
      let wb = results["Well-Being"];
      let oc = results["Organisational Commitment"];
      let ep = results["Employee Productivity"];
      let bp = this.formulaResults["Business Productivity"]
      let times = Object.keys(results["Anxiety"]);

      let keys = Object.keys(results);
      times.forEach(i => {

        let ave = 0;
        let cnt = 0;
        keys.forEach(k => {
          if (results[k][i] <= 5) {
            ave += Number(results[k][i].toFixed(2));
            cnt++;
          }

        });

        ave = ave/cnt;


        let cur = series[6]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[6]["data"][Number(i)-1] = ave;
        } else {
          series[6]["data"][Number(i)-1] += ave;
        }

        cur = series[0]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[0]["data"][Number(i)-1] = Number(mh[i]);
        } else {
          series[0]["data"][Number(i)-1] += Number(mh[i]);
        }

        cur = series[1]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[1]["data"][Number(i)-1] = Number(js[i]);
        } else {
          series[1]["data"][Number(i)-1] += Number(js[i]);
        }
        cur = series[2]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[2]["data"][Number(i)-1] = Number(wb[i]);
        } else {
          series[2]["data"][Number(i)-1] += Number(wb[i]);
        }
        cur = series[3]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[3]["data"][Number(i)-1] = Number(oc[i]);
        } else {
          series[3]["data"][Number(i)-1] += Number(oc[i]);
        }
        cur = series[4]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[4]["data"][Number(i)-1] = Number(ep[i]);
        } else {
          series[4]["data"][Number(i)-1] += Number(ep[i]);
        }
      });

      times = Object.keys(bp);
      times.forEach(i => {
        let cur = series[5]["data"][Number(i)-1];
        if (typeof cur == "undefined") {
          series[5]["data"][Number(i)-1] = Number(bp[i]);
        } else {
          series[5]["data"][Number(i)-1] += Number(bp[i]);
        }
      })
    });

    let userCount = allResults.length;
    series.forEach(function(seri, index,arr) {
      seri["data"].forEach(function (val, index2) {
        arr[index]["data"][index2] = Number((val/userCount).toFixed(2));
      });
    });
    return series;
  }


}
