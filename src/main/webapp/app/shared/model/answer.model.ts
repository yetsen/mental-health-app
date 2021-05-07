export interface IAnswer {
  userId?: string;
  questionName?: string;
  choiceValue?: string;
}

export class Answer implements IAnswer {
  constructor(public userId?: string, public questionName?: string, public choiceValue?: string) {}
}
