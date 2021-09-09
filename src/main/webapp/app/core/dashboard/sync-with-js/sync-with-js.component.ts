import Component from 'vue-class-component';
import {Inject, Prop, Vue} from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import heatmap from "highcharts/modules/heatmap";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import Data from 'highcharts/modules/data'


exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
heatmap(Highcharts);
Data(Highcharts);

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

function sync(vm, event, type) {
  vm.$refs.highcharts.forEach(({ chart }) => {
    if (chart === this.series.chart) return;
    chart.series.forEach((series) => {
      series.data.forEach((point) => {
        if (point.x === this.x) {
          if (type === 'over') {
            point.setState('hover');
            chart.tooltip.refresh(point);
            chart.xAxis[0].drawCrosshair(event, point);
          } else {
            point.setState();
            chart.tooltip.hide();
            chart.xAxis[0].hideCrosshair();
          }
        }
      });
    });
  });
}

function genOptions(vm, dataset) {
  return {
    chart: {
      marginLeft: 40, // Keep all charts left aligned
      spacingTop: 20,
      spacingBottom: 20
    },
    title: {
      text: dataset.name,
      align: 'left',
      margin: 0,
      x: 30
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      crosshair: true,
      labels: {
        format: '{value}'
      },
      categories: vm.times(),
    },
    yAxis: {
      title: {
        text: null
      },
      min: 0,
      max: dataset.max,
      tickInterval: 1
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      positioner: function() {
        return {
          // right aligned
          x: this.chart.chartWidth - this.label.width,
          y: 10 // align to title
        };
      },
      borderWidth: 0,
      backgroundColor: 'none',
      pointFormat: '{point.y}',
      headerFormat: '',
      shadow: false,
      style: {
        fontSize: '18px'
      },
      valueDecimals: dataset.valueDecimals
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function(event) {
              sync.call(this, vm, event, 'over');
            },
            mouseOut: function(event) {
              sync.call(this, vm, event, 'out');
            }
          }
        }
      }
    },
    series: [{
      data: dataset.data,
      name: dataset.name,
      type: dataset.type,
      color: dataset.color,
      fillOpacity: 0.3,
      tooltip: {
        valueSuffix: ' ' + dataset.unit
      }
    }]
  };
}

@Component
export default class SyncWithJsComponent extends Vue {

  @Prop()
  formulaResults: string;


  optionsList: {};

  data() {
    return {
      optionsList : {}
    };
  }

  fetchData() {
    let results = this.formulaResults;
    let dataset = [];
    let chartData = {};
    chartData['data'] = []
    let times = Object.keys(results["Job Satisfaction"]);
    times.forEach(i => {
      chartData['data'].push(Number(results["Job Satisfaction"][i].toFixed(2)));
    });
    chartData['color'] = '#90ee7e'
    chartData['name'] = 'Job Satisfaction'
    chartData['type'] = 'line'
    chartData['unit'] = ''
    chartData['valueDecimals'] = 1
    chartData['max'] = 5
    dataset.push(chartData);

    chartData = {};
    chartData['data'] = []
    times = Object.keys(results["Anxiety"]);
    times.forEach(i => {
      chartData['data'].push(Number(results["Anxiety"][i].toFixed(2)));
    });
    chartData['color'] = '#90ee7e'
    chartData['name'] = 'Mental Health'
    chartData['type'] = 'line'
    chartData['unit'] = ''
    chartData['valueDecimals'] = 1
    chartData['max'] = 32
    dataset.push(chartData);

    chartData = {};
    chartData['data'] = []
    times = Object.keys(results["Well-Being"]);
    times.forEach(i => {
      chartData['data'].push(Number(results["Well-Being"][i].toFixed(2)));
    });
    chartData['color'] = '#90ee7e'
    chartData['name'] = 'Well-Being'
    chartData['type'] = 'line'
    chartData['unit'] = ''
    chartData['valueDecimals'] = 1
    chartData['max'] = 5
    dataset.push(chartData);

    this.optionsList = dataset.map(d => {
      return genOptions(this, d);
    })

  }

  times() {
    let results = this.formulaResults;
    return Object.keys(results["Well-Being"]);
  }

  mounted() {
    this.fetchData();
  }

}
