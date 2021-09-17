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
export default class EmployerSpeedometerWithWbComponent extends Vue {

  @Prop()
  formulaResults: string;

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
          "text": "Mental Health",
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
            "min": 0,
            "max": 21,
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
            "name": "Mental Health",
            "innerSize": "30%",
            "data": [
              [
                "Minimal <br> Anxiety",
                4
              ],
              [
                "Mild <br> Anxiety",
                5
              ],
              [
                "Moderate <br> Anxiety",
                5
              ],
              [
                "Severe <br> Anxiety",
                7
              ]
            ]
          },
          {
            "type": "gauge",
            "data": [],
            "dial": {
              "rearLength": 0
            }
          }
        ]
      }
    };
  }

  series() {

  }


}
