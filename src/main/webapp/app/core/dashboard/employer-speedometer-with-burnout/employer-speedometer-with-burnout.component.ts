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
export default class EmployerSpeedometerWithBurnoutComponent extends Vue {

  @Prop()
  formulaResults: string;
  @Prop()
  companyFormulaResults: string[];

  data() {
    //console.log(parsed)
    //console.log(JSONfn.stringify())



    return {
      chartOptions: {
        "chart": {
          "renderTo": "container",
          "plotBackgroundColor": null,
          "plotBackgroundImage": null,
          "plotBorderWidth": 0,
          "plotShadow": false
        },
        "title": {
          "text": "Burnout",
          "align": "center",
          "verticalAlign": "top",
          "y": 40
        },
        "tooltip": {
          "useHTML": true,
          "formatter": function () {
            if (typeof this.point.half === 'undefined') {
              return 'Result: <b>' + this.point.y + '<b>'
            } else{
              return false
            }
          }
        },
        "pane": {
          "center": [
            "50%",
            "75%"
          ],
          "size": "50%",
          "startAngle": -90,
          "endAngle": 90,
          "background": {
            "borderWidth": 0,
            "backgroundColor": "none",
            "innerRadius": "60%",
            "outerRadius": "100%",
            "shape": "arc"
          }
        },
        "yAxis": [
          {
            "lineWidth": 0,
            "min": 1,
            "max": 5,
            "minorTickLength": 0,
            "tickLength": 0,
            "tickWidth": 0,
            "labels": {
              "enabled": false
            },
            "title": {
              "useHTML": true,
              "y": 80
            },
            "pane": 0
          }
        ],
        "plotOptions": {
          "pie": {
            "dataLabels": {
              "enabled": true,
              "distance": -50,
              "style": {
                "fontWeight": "bold",
                "color": "white",
                "textShadow": "0px 1px 2px black"
              }
            },
            "startAngle": -90,
            "endAngle": 90,
            "center": [
              "50%",
              "75%"
            ]
          },
          "gauge": {
            "dataLabels": {
              "enabled": false
            },
            "dial": {
              "radius": "100%"
            }
          }
        },
        "series": [
          {
            "type": "pie",
            "name": "Burnout",
            "innerSize": "30%",
            "data": [
              [
                "Minimal",
                1
              ],
              [
                "Mild",
                1
              ],
              [
                "Moderate",
                1
              ],
              [
                "Severe",
                1
              ]
            ]
          },
          {
            "type": "gauge",
            "data": [this.result()],
            "dial": {
              "rearLength": 0
            }
          }
        ]
      }
    };
  }


  result() {
    let allResults = this.companyFormulaResults;
    let total = 0;
    allResults.forEach(results => {
      let mh = results["Burnout"];
      let times = Object.keys(mh);
      let currentTime = times[times.length - 1];
      total += mh[currentTime];
    });
    let userCount = allResults.length;
    return Number((total/userCount).toFixed(2));
  }


}
