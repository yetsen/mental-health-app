import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import offlineExporting from "highcharts/modules/offline-exporting";
import exportingInit from "highcharts/modules/exporting";
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more'

exportingInit(Highcharts);
offlineExporting(Highcharts);
More(Highcharts);
@Component
export default class DummyComponent extends Vue {
  data() {
    return {
      chartOptions: {chart:{polar:true,type:'line'},title:{text:'Personality',x:-80},pane:{size:'80%'},xAxis:{categories:['Extraversion','Agreeableness','Conscientiousness','Neuroticism','OpennesstoExperience'],tickmarkPlacement:'on',lineWidth:0},yAxis:{gridLineInterpolation:'polygon',lineWidth:0,min:0},tooltip:{shared:true,pointFormat:'<spanstyle=\"color:{series.color}\">{series.name}:<b>{point.y}</b><br/>'},legend:{align:'right',verticalAlign:'middle',layout:'vertical'},series:[{name:'Results',data:[1.5,0.5,1.5,1.5,0.0],pointPlacement:'on'}],responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{align:'center',verticalAlign:'bottom',layout:'horizontal'},pane:{size:'70%'}}}]},exporting:{buttons:{contextButton:{menuItems:['viewFullscreen','downloadPNG','downloadJPEG','downloadPDF']}}}}
    };
  }
}
