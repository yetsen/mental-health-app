import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import * as SurveyVue from 'survey-vue';
import SurveyService from '@/core/survey.service.ts';
import { Answer } from '@/shared/model/answer.model.ts';
import Showdown from 'showdown';

SurveyVue.StylesManager.applyTheme('modern');

let Survey = SurveyVue.Survey;
Survey['cssType'] = 'bootstrap';

@Component({
  name: 'surveyCard',
  components: {
    Survey,
  },
})
export default class SurveyCardComponent extends Vue {
  @Inject('surveyService')
  private surveyService: () => SurveyService;

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

    (window as any).survey.onComplete.add(function (model, options) {
      that.pushCurrentSurveyData(model.data);
      that['isCompletionPage'] = true;
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
        let result = { ...res.data['singleNode'], ...res.data['parentNode'], ...res.data['singleNodeMultipleAnswer'] };
        (window as any).survey.data = result;
      });

    return {
      survey: (window as any).survey,
      pageNumber: 'Page 1 of 15',
      progress: '7%',
      isCompletionPage: false,
    };
  }

  surveyValidateQuestion(s, options) {
    if (options.name === 'ConsentForm') {
      if (options.value.length < 4) {
        options.error = 'Your consent is required to go on survey.';
      }
    } else if (options.question.getType() === 'matrix') {
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
    return this.$store.getters.account !== null ? this.$store.getters.account.id : "as";
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
      if (typeof value === 'string') {
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
          ans.choiceValue = value[key];
          answers.push(ans);
        });
      }
    });
    return answers;
  }
}
