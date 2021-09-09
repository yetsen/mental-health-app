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
  colors: ['#90ee7e', '#aaeeee', '#2b908f',
    '#f45b5b', '#ff0066', '#eeaaee', '#55BF3B',
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
export default class BoxPlotComponent extends Vue {

  @Prop()
  formulaResults: string;

  data() {

    return {
      chartOptions: {

        chart: {
          type: 'boxplot'
        },

        title: {
          text: 'General Average'
        },

        legend: {
          enabled: false
        },

        xAxis: {
          categories: this.times(),
          title: {
            text: 'Times'
          }
        },

        yAxis: {
          title: {
            text: 'Average'
          },
          min: 0,
          max: 5
        },

        series: [{
          name: 'Statistics',
          data: this.seriesData(),
          type: 'boxplot',
          tooltip: {
            headerFormat: '<em>Assessment {point.key}</em><br/>'
          }
        }]

      }
    };
  }

  times() {
    let results = this.formulaResults;
    return Object.keys(results["Well-Being"]);
  }

  seriesData() {
    let seriesData = [];


    let results = this.formulaResults;
    let times = Object.keys(results["Well-Being"]);
    let keys = Object.keys(results);
    times.forEach(i => {
      let row = [];
      keys.forEach(k => {
        if (results[k][i] <= 5)
          row.push(Number(results[k][i].toFixed(2)));
      });
      row.sort();
      let median = row.length % 2 == 1 ? row[Math.floor(row.length/2)] : (row[row.length/2] + row[row.length/2 - 1])/2;
      let ql = row[Math.floor(row.length/4)];
      let qu = row[Math.floor(row.length*3/4)];
      seriesData.push([
        row[0],
        ql,
        median,
        qu,
        row[row.length - 1]
      ]);
    });
    console.log(seriesData);
    return seriesData;

  }


}
