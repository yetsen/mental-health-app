import Component from 'vue-class-component';
import {Inject, Watch} from 'vue-property-decorator';
import Vue from 'vue';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';
import ChartService from "@/core/chart.service";
import BubbleWithMhComponent from "@/core/dashboard/bubble-with-mh/bubble-with-mh.vue";
import BubbleWithWbComponent from "@/core/dashboard/bubble-with-wb/bubble-with-wb.vue";
import BubbleWithWbBurnoutPr from "@/core/dashboard/bubble-with-wb-burnout-pr/bubble-with-wb-burnout-pr.vue";
import BubbleWithMhBurnoutPr from "@/core/dashboard/bubble-with-mh-burnout-pr/bubble-with-mh-burnout-pr.vue";
import BoxPlotComponent from "@/core/dashboard/box-plot/box-plot.vue";
import SyncWithEpComponent from "@/core/dashboard/sync-with-ep/sync-with-ep.vue";
import SyncWithJsComponent from "@/core/dashboard/sync-with-js/sync-with-js.vue";
import ScatterLineWithMh from "@/core/dashboard/scatter-line-with-mh/scatter-line-with-mh.vue";
import ScatterLineWithWb from "@/core/dashboard/scatter-line-with-wb/scatter-line-with-wb.vue";
import EmployerBubble from "@/core/dashboard/employer-bubble/employer-bubble.vue";
import EmployerCombination from "@/core/dashboard/employer-combination/employer-combination.vue";
import GeneralLine from "@/core/dashboard/general-line-chart/general-line.vue";
import SpeedometerWithMhComponent from "@/core/dashboard/speedometer-with-mh/speedometer-with-mh.vue";
import SpeedometerWithWbComponent from "@/core/dashboard/speedometer-with-wb/speedometer-with-wb.vue";
import SpeedometerWithBurnoutComponent from "@/core/dashboard/speedometer-with-burnout/speedometer-with-burnout.vue";
import EmployeeCurrentHorizontalBar from "@/core/dashboard/employee-current-horizontal-bar-chart/employee-current-horizontal-bar-chart.vue";
import EmployerSpeedometerWithMhComponent from "@/core/dashboard/employer-speedometer-with-mh/employer-speedometer-with-mh.vue";
import EmployerSpeedometerWithWbComponent from "@/core/dashboard/employer-speedometer-with-wb/employer-speedometer-with-wb.vue";
import EmployerBar from "@/core/dashboard/employer-current-horizontal-bar-chart/employer-current-horizontal-bar-chart.vue";
import Highcharts from "highcharts";

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

@Component({
  name: 'dashboard',
  components: {
    dummyComponent: DummyComponent,
    bubbleWithMhComponent: BubbleWithMhComponent,
    bubbleWithWbComponent: BubbleWithWbComponent,
    boxPlot : BoxPlotComponent,
    syncWithEp: SyncWithEpComponent,
    syncWithJs: SyncWithJsComponent,
    scatterLineMh: ScatterLineWithMh,
    scatterLineWb: ScatterLineWithWb,
    employerBubble: EmployerBubble,
    employerCombination: EmployerCombination,
    generalLine: GeneralLine,
    speedometerWithMh: SpeedometerWithMhComponent,
    speedometerWithWb: SpeedometerWithWbComponent,
    employeeCurrentHorizontalBar: EmployeeCurrentHorizontalBar,
    employerSpeedometerWithMh: EmployerSpeedometerWithMhComponent,
    employerSpeedometerWithWb: EmployerSpeedometerWithWbComponent,
    employerBar: EmployerBar,
    speedometerWithBurnoutComponent: SpeedometerWithBurnoutComponent,
    bubbleWithWbBurnoutPr: BubbleWithWbBurnoutPr,
    bubbleWithMhBurnoutPr: BubbleWithMhBurnoutPr
  },
})
export default class Dashboard extends Vue {
  @Inject('chartService')
  private chartService: () => ChartService;

  public chartList = [];

  public formulaResults = {};

  public companyFormulaResults = [];

  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged(value: string, oldValue: string) {
    this.chartService().getAllFormulaResults(this.userId()).then(
      value => this.formulaResults = value.data
    )
    if (this.isEmployer()) {
       this.chartService().getAllCompanyFormulaResults(this.companyId()).then(
           value => this.companyFormulaResults = value.data
       )

    }
  }

  userId() {
    return this.$store.getters.account.id;
  }

  companyId() {
    return this.$store.getters.account.companyId;
  }

  isEmployer() {
    return this.$store.getters.account.isEmployer;
  }
}
