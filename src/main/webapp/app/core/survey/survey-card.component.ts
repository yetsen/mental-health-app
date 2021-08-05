import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import * as SurveyVue from 'survey-vue';
import SurveyService from '@/core/survey.service.ts';
import {Answer, Answers, SurveyInfo} from '@/shared/model/answers.model.ts';
import Showdown from 'showdown';
import {gsap, Bounce, Power3} from 'gsap/all';
import ChartService from "@/core/chart.service";
import DummyComponent from "@/core/dashboard/dummy/dummy.vue";

SurveyVue.StylesManager.applyTheme('bootstrap');
//SurveyVue.settings.lazyRowsRendering = true; //experimental if problem occurs remove it

let Survey = SurveyVue.Survey;

@Component({
  name: 'surveyCard',
  components: {
    Survey,
    dummyComponent: DummyComponent,
  },
})
export default class SurveyCardComponent extends Vue {
  @Inject('surveyService')
  private surveyService: () => SurveyService;

  @Inject('chartService')
  private chartService: () => ChartService;

  private doAnimation = true;

  private times;

  public currentChart = {};
  public currentSurveyModal = {};
  public currentSurveyOptions = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.times) {
        vm.times = to.params.times;
        vm.surveyService()
            .getAnswer(vm.userId(), to.params.times)
            .then(res => {
              let result = { ...res.data['singleNode'], ...res.data['parentNode'], ...res.data['singleNodeMultipleAnswer'], ...res.data['parentNodeMultipleAnswer'] };
              (window as any).survey.data = result;
            });
      }
    });
  }

  data() {
    let json = this.$store.getters.survey;
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
      if (sender.currentPageValue === undefined || !that.doAnimation)
        return;

      that.doAnimation = false;
      options.allowChanging = false;

      let that2 = that;
      that.pushCurrentSurveyData(sender.data).then(() => {
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
          that2.startTransition(sender, options);
          that2.movePuzzle();
        }
      })
      .catch(error => {
        console.log(error);
      });
    });

    (window as any).survey.onComplete.add(function (model, options) {
      that.pushCurrentSurveyData(model.data).then(() => {
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
          (<any>that2).$router.push('/dashboard/' + that2.times);
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

  private movePuzzle() {
    let head = document.querySelector("#head");
    let headX = head.getBoundingClientRect().x;
    let headY = head.getBoundingClientRect().y;
    let p1 = document.querySelector("#p1");
    let p1X = p1.getBoundingClientRect().x;
    let p1Y = p1.getBoundingClientRect().y;
    let p1ImagePlaceX = 128;
    let p1ImagePlaceY = 76;
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(headX);
    console.log(headY);
    gsap.timeline().to("#p1", 1, {x: (headX + p1ImagePlaceX) - p1X,
      y: (headY + p1ImagePlaceY) - p1Y })
  }

  private startTransition(sender, options) : void {
    let that = this;
    let wrapper = gsap.timeline({onComplete: function (){
        that.doAnimation = true;
    }});
    setTimeout(function () {
      sender.currentPage = options.newCurrentPage;
    }, 1700);
    //let direction = options.isPrevPage ? -1 : 1;
    let direction = 1;
    wrapper.to("#surveyElement", {scale: .8, ease: Bounce.easeOut, duration: 1});
    wrapper.to("#surveyElement", {delay: -.25, x: -2400*direction, ease: Power3.easeIn, duration: 1});
    //wrapper.to("#surveyElement", {x: 2400*direction, duration: 0});
    wrapper.to("#surveyElement", {delay: 1, x: 0, ease: Power3.easeOut, duration: 1});
    wrapper.to("#surveyElement", {scale: 1, ease: Bounce.easeOut, duration: 1});

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
    //TODO: remove it
    return this.$store.getters.account.id;
  }

  public get blocks() {
    return this.$store.getters.survey.pages;
  }

  pushCurrentSurveyData(surveyData: any) {
    let answers = this.convertSurveyDataToAnswer(surveyData);
    return this.surveyService().push(answers)

  }

  clearAndGoToHomePage() {
    (window as any).survey.clear();
    this.surveyService().clearAnswer(this.userId(), this.times);
    (<any>this).$router.push('/');
  }

  closeDialog(): void {
    (<any>this.$refs.clearAndExitModal).hide();
  }

  prepareClearAndExitModal(): void {
    if (<any>this.$refs.clearAndExitModal) {
      (<any>this.$refs.clearAndExitModal).show();
    }
  }

  preparePreviewChartModal(): void {
    if (<any>this.$refs.previewChartModal) {
      (<any>this.$refs.previewChartModal).show();
    }
  }

  closeDialogAndOpenPreviousPage(): void {
    (<any>this.$refs.previewChartModal).hide();
    this.doAnimation = true;
  }

  closeDialogAndOpenNextPage(): void {
    (<any>this.$refs.previewChartModal).hide();
    this.startTransition(this.currentSurveyModal, this.currentSurveyOptions);
  }

  private convertSurveyDataToAnswer(surveyData: any): Answers {
    let answers: Answers = {};
    answers.answers = [];
    let that = this;
    let si = new SurveyInfo();
    si.userId = that.userId();
    si.times = that.times;
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
