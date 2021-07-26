import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import * as SurveyVue from 'survey-vue';
import SurveyService from '@/core/survey.service.ts';
import { Answer } from '@/shared/model/answer.model.ts';
import Showdown from 'showdown';
import {gsap, Bounce, Power3} from 'gsap/all';

SurveyVue.StylesManager.applyTheme('bootstrap');

let Survey = SurveyVue.Survey;

@Component({
  name: 'surveyCard',
  components: {
    Survey,
  },
})
export default class SurveyCardComponent extends Vue {
  @Inject('surveyService')
  private surveyService: () => SurveyService;

  private doAnimation = true;

  data() {
    let json = this.$store.getters.survey;
    json.showNavigationButtons = 'none';
    json.showProgressBar = 'none';
    (window as any).survey = new SurveyVue.Model(json);

    (window as any).survey.questionTitleTemplate = '{title}';

    let that = this;

    (window as any).survey.onCurrentPageChanged.add(function (model, options) {
      that.pushCurrentSurveyData(model.data);
      let currentPage = (window as any).survey.currentPageNo + 1;
      let visiblePageCount = (window as any).survey.visiblePageCount;
      that['progress'] = 100 * (currentPage / visiblePageCount) + '%';
      that['pageNumber'] = 'Page ' + currentPage + ' of ' + visiblePageCount;
      (window as any).survey.render();
    });
    (window as any).survey.onCurrentPageChanging.add(function (sender, options) {
      if (!that.doAnimation)
        return;
      options.allowChanging = false;
      that.startTransition(sender, options);
    });

    (window as any).survey.onComplete.add(function (model, options) {
      that.pushCurrentSurveyData(model.data);
      that['isCompletionPage'] = true;
      (<any>this).$router.push('/dashboard');
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
    this.surveyService()
      .getAnswer(this.userId())
      .then(res => {
        let result = { ...res.data['singleNode'], ...res.data['parentNode'], ...res.data['singleNodeMultipleAnswer'], ...res.data['parentNodeMultipleAnswer'] };
        (window as any).survey.data = result;
      });

    let tableCss = {
      matrix: {
        root: "table table-striped"
      }
    };

    (window as any).survey.css = tableCss;

    return {
      survey: (window as any).survey,
      pageNumber: 'Page 1 of 15',
      progress: '7%',
      isCompletionPage: false,
    };
  }

  private startTransition(sender, options) : void {
    let that = this;
    that.doAnimation = false;
    let wrapper = gsap.timeline({onComplete: function (){
        that.doAnimation = true;
    }});
    setTimeout(function () {
      sender.currentPage = options.newCurrentPage;
    }, 1700);
    let direction = options.isPrevPage ? -1 : 1;
    wrapper.to("#surveyElement", {scale: .8, ease: Bounce.easeOut, duration: 1});
    wrapper.to("#surveyElement", {delay: -.25, x: -2400*direction, ease: Power3.easeIn, duration: 1});
    wrapper.to("#surveyElement", {x: 2400*direction, duration: 0});
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

  pushCurrentSurveyData(surveyData: any) {
    let answers = this.convertSurveyDataToAnswer(surveyData);
    this.surveyService()
      .push(answers)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.log(error);
      });
  }

  clearAndGoToHomePage() {
    (window as any).survey.clear();
    this.surveyService().clearAnswer(this.userId());
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

  private convertSurveyDataToAnswer(surveyData: any): Answer[] {
    let answers: Answer[] = [];
    let that = this;
    Object.keys(surveyData).forEach(function (key, index) {
      let value = surveyData[key];
      if (typeof value === 'string' || typeof value === 'number') {
        let ans = new Answer();
        ans.userId = that.userId();
        ans.questionName = key;
        ans.choiceValue = value;
        answers.push(ans);
      } else if (Array.isArray(value)) {
        value.forEach(v => {
          let ans = new Answer();
          ans.userId = that.userId();
          ans.questionName = key;
          ans.choiceValue = v;
          answers.push(ans);
        });
      } else {
        Object.keys(value).forEach(function (key, index) {
          let ans = new Answer();
          ans.userId = that.userId();
          ans.questionName = key;
          if (typeof value[key] === 'string') {
            ans.choiceValue = value[key];
          } else {
            ans.choiceValue = String(Object.values(value[key])[0]);
          }
          answers.push(ans);
        });
      }
    });
    return answers;
  }
}
