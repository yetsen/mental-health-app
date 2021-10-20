import Component from 'vue-class-component';
import {Vue, Inject, Watch} from 'vue-property-decorator';
import * as SurveyVue from 'survey-vue';
import SurveyService from '@/core/survey.service.ts';
import {Answer, Answers, SurveyInfo} from '@/shared/model/answers.model.ts';
import Showdown from 'showdown';
import {gsap, Bounce, Power3} from 'gsap/all';
import ChartService from "@/core/chart.service";
import DummyComponent from "@/core/dashboard/dummy/dummy.vue";
import ICountUp from 'vue-countup-v2';

SurveyVue.StylesManager.applyTheme('modern');
//SurveyVue.settings.lazyRowsRendering = true; //experimental if problem occurs remove it

let Survey = SurveyVue.Survey;

@Component({
  name: 'surveyCard',
  components: {
    Survey,
    dummyComponent: DummyComponent,
    ICountUp
  },
})
export default class SurveyCardComponent extends Vue {
  @Inject('surveyService')
  private surveyService: () => SurveyService;

  @Inject('chartService')
  private chartService: () => ChartService;

  private times;

  public currentChart = {};
  public currentSurveyModal = {};
  public currentSurveyOptions = {};

  private surveyId;

  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged(value: string, oldValue: string) {
    if (this.times === value['params'].times)
      return;

    this.times = value['params'].times;
    this.surveyId = this.isEmployer() ? 3 : 2;
    this.surveyService()
        .getAnswer(this.userId(), this.times, this.surveyId)
        .then(res => {
          let result = { ...res.data['singleNode'], ...res.data['parentNode'], ...res.data['singleNodeMultipleAnswer'], ...res.data['parentNodeMultipleAnswer'] };
          (window as any).survey.data = result;
        });
  }

  data() {
    let json = this.isEmployer() ? this.$store.getters.employerSurvey : this.$store.getters.survey;
    json.showNavigationButtons = 'none';
    json.showProgressBar = 'none';
    (window as any).survey = new SurveyVue.Model(json);

    (window as any).survey.questionTitleTemplate = '{title}';

    let that = this;

    (window as any).survey.onCurrentPageChanged.add(function (model, options) {
      //that.pushCurrentSurveyData(model.data);
      let currentPage = (window as any).survey.currentPageNo + 1;
      let visiblePageCount = (window as any).survey.visiblePageCount;
      that['progress'] = 100 * (currentPage / visiblePageCount) + '%';
      that['pageNumber'] = currentPage + ' of ' + visiblePageCount;
      (window as any).survey.title = that.blocks[currentPage - 1].name;
      (window as any).survey.render();
    });
    (window as any).survey.onCurrentPageChanging.add(function (sender, options) {
      if (sender.currentPageValue === undefined)
        return;

      let that2 = that;
      that.pushCurrentSurveyData(sender.data, false).then(() => {
        let currentPage = (window as any).survey.currentPageNo;
        if (that2.blocks[currentPage].chartId !== null) {
          let that3 = that2;
          that2.chartService().getBlockChart(that2.blocks[currentPage].id, that2.userId(), that2.times).then(chart => {
            that3.currentChart = chart.data;
            that3.currentSurveyModal = sender;
            that3.currentSurveyOptions = options;
            that3.preparePreviewChartModal();
          })
        } else {
          sender.currentPage = options.newCurrentPage;
        }
      })
      .catch(error => {
        console.log(error);
      });
    });

    (window as any).survey.onComplete.add(function (model, options) {
      that.pushCurrentSurveyData(model.data, true).then(() => {
        let that2 = that;
        let currentPage = (window as any).survey.currentPageNo;
        if (that2.blocks[currentPage].chartId !== null) {
          let that3 = that2;
          that2.chartService().getBlockChart(that2.blocks[currentPage].id, that2.userId(), that2.times).then(chart => {
            that3.currentChart = chart.data;
            that3.currentSurveyModal = model;
            that3.currentSurveyOptions = options;
            that3.preparePreviewChartModal();
          })
        } else {
          that2['isCompletionPage'] = true;
          (<any>that2).$router.push('/dashboard');
        }
        }).catch(error => {
              console.log(error);
        });
    });

    let converter = new Showdown.Converter();

    (window as any).survey.onTextMarkdown.add(function (survey, options) {
      //convert the markdown text to html
      let str = converter.makeHtml(options.text);
      //remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      //set html
      options.html = str;
    });

    (window as any).survey.onValidateQuestion.add(this.surveyValidateQuestion);

    let tableCss = {
      matrix: {
        root: "table"
      }
    };

    (window as any).survey.css = tableCss;

    return {
      survey: (window as any).survey,
      pageNumber: '1 of 15',
      progress: '7%',
      isCompletionPage: false,
    };
  }

  surveyValidateQuestion(s, options) {
    if (options.name === 'ConsentForm') {
      if (options.value.length < 4) {
        options.error = 'Your consent is required to go on survey.';
      }
    } else if (options.question.getType() === 'matrix' || options.question.getType() === 'matrixdropdowm') {
      if (
        !options.question.rows.every(function (row) {
          return (options.value || {})[row.itemValue] !== undefined;
        })
      ) {
        options.error = 'All rows should be answered.';
      }
    }
  }

  userId() {
    return this.$store.getters.account.id;
  }

  isEmployer() {
    return this.$store.getters.account.isEmployer;
  }

  public get blocks() {
    return this.$store.getters.survey.pages;
  }

  pushCurrentSurveyData(surveyData: any, surveyFinished: boolean) {
    let answers = this.convertSurveyDataToAnswer(surveyData, surveyFinished);
    return this.surveyService().push(answers)

  }

  clearAndGoToHomePage() {
    (window as any).survey.clear();
    this.surveyService().clearAnswer(this.userId(), this.times, this.surveyId);
    (<any>this).$router.push('/');
  }

  preparePreviewChartModal(): void {
    if (<any>this.$refs.previewChartModal) {
      (<any>this.$refs.previewChartModal).show();
    }
  }

  private convertSurveyDataToAnswer(surveyData: any, surveyFinished: boolean): Answers {
    let answers: Answers = {};
    answers.answers = [];
    let that = this;
    let si = new SurveyInfo();
    si.userId = that.userId();
    si.times = that.times;
    si.surveyId = that.surveyId;
    si.finished = surveyFinished
    answers.surveyInfo = si;
    Object.keys(surveyData).forEach(function (key, index) {
      let value = surveyData[key];
      if (typeof value === 'string' || typeof value === 'number') {
        let ans = new Answer();
        ans.questionName = key;
        ans.choiceValue = value;
        answers.answers.push(ans);
      } else if (Array.isArray(value)) {
        value.forEach(v => {
          let ans = new Answer();
          ans.questionName = key;
          ans.choiceValue = v;
          answers.answers.push(ans);
        });
      } else {
        Object.keys(value).forEach(function (key, index) {
          let ans = new Answer();
          ans.questionName = key;
          if (typeof value[key] === 'string') {
            ans.choiceValue = value[key];
          } else {
            ans.choiceValue = String(Object.values(value[key])[0]);
          }
          answers.answers.push(ans);
        });
      }
    });
    return answers;
  }
}
