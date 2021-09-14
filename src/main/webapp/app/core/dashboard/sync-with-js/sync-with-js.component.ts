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
      title: {
        text: 'Months'
      },
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
    chartData['color'] = '#7AF5F5'
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
    chartData['color'] = '#3399FF'
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
    chartData['color'] = '#CA278C'
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
