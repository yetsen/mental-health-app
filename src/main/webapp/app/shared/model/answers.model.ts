export interface IAnswer {
  questionName?: string;
  choiceValue?: string | number;
}
export interface ISurveyInfo {
  userId?: string;
  times?: number;
  surveyId?: number;
  finished?: boolean;
}

export interface IAnswers {
  answer?: Answer[];
  surveyInfo?: SurveyInfo;
}

export class Answers implements IAnswers {
  constructor(public answers?: Answer[], public surveyInfo?: SurveyInfo) {}
}

export class Answer implements IAnswer {
  constructor(public questionName?: string, public choiceValue?: string | number) {}
}

export class SurveyInfo implements ISurveyInfo {
  constructor(public userId?: string, public times?: number, public surveyId?: number, public finished?: boolean) {}
}
