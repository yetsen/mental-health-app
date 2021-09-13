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

Highcharts.createElement('link', {
  href: 'https://fonts.googleapis.com/css?family=Jost',
  rel: 'stylesheet',
  type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts['theme'] = {
  colors: ['#90ee7e', '#aaeeee', '#FFF300',
    '#f45b5b', '#ff0000', '#eeaaee', '#55BF3B',
    '#DF5353', '#7798BF', '#aaeeee', '#7798BF'
  ],
  chart: {
    backgroundColor: {
      stops: [
        [0, '#27293d'],
        [1, '#27293d']
      ]
    },
    style: {
      fontFamily: '\'Jost\', sans-serif'
    },
    plotBorderColor: '#606063'
  },
  title: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
      fontSize: '20px'
    }
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase'
    }
  },
  xAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    title: {
      style: {
        color: '#A0A0A3'

      }
    }
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#A0A0A3'
      }
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
      color: '#F0F0F0'
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: '#F0F0F3',
        style: {
          fontSize: '13px'
        }
      },
      marker: {
        lineColor: '#333'
      }
    },
    boxplot: {
      fillColor: '#505053'
    },
    candlestick: {
      lineColor: 'white'
    },
    errorbar: {
      color: 'white'
    }
  },
  legend: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    itemStyle: {
      color: '#e0e0e3'
    },
    itemHoverStyle: {
      color: '#FFF'
    },
    itemHiddenStyle: {
      color: '#606063'
    },
    title: {
      style: {
        color: '#C0C0C0'
      }
    }
  },
  credits: {
    style: {
      color: '#666'
    }
  },
  labels: {
    style: {
      color: '#707073'
    }
  },

  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3'
    },
    activeDataLabelStyle: {
      color: '#F0F0F3'
    }
  },

  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#505053'
      }
    }
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#505053',
      stroke: '#000000',
      style: {
        color: '#CCC'
      },
      states: {
        hover: {
          fill: '#707073',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          fill: '#000003',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        }
      }
    },
    inputBoxBorderColor: '#505053',
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {
      color: 'silver'
    }
  },

  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA'
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED'
    },
    xAxis: {
      gridLineColor: '#505053'
    }
  },

  scrollbar: {
    barBackgroundColor: '#808083',
    barBorderColor: '#808083',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: '#606063',
    buttonBorderColor: '#606063',
    rifleColor: '#FFF',
    trackBackgroundColor: '#404043',
    trackBorderColor: '#404043'
  }
};

Highcharts.setOptions(Highcharts['theme']);

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
            text: 'Times'
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
    series.push(seri);
    seri = {};
    seri['name'] = "Job Satisfaction";
    seri['type'] = "column";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Well-Being";
    seri['type'] = "column";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Organizational Commitment";
    seri['type'] = "column";
    seri['data'] = [];
    series.push(seri);
    seri = {};
    seri['name'] = "Employee Productivity";
    seri['type'] = "column";
    seri['data'] = [];

    series.push(seri);
    seri = {};
    seri['name'] = "Business Productivity";
    seri['type'] = "column";
    seri['data'] = [];
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
    console.log(series);
    return series;
  }


}
