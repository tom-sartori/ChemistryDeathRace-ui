import { QuestionPanel } from '@classes/question-panel';
import { Question } from '@models/question/question.model';
import { framePadding } from '@constants/ui-constants';
import { Proposition } from '@models/question/proposition.model';
import { Observable } from '@interfaces/observable';
import { Observer } from '@interfaces/observer';
import { ObservableSubjectPlayerAnswered } from '@classes/ObservableSubject';

export const isEqual = require('lodash/isEqual.js');

export class QuestionPanelResult extends QuestionPanel implements Observable {

  private observers: Observer[];

  constructor(question: Question, proposition: Proposition) {
    const width: number = W - (framePadding * 2);
    const height: number = H - (framePadding * 2);
    const answer: Proposition = question.propositions.find(proposition => proposition.answer)!;
    const labelGoNext: Label = new Label('Passer à la suite');

    const content = {
      header: new Label({
        text: question.name, labelWidth: width, labelHeight: height / 4, align: CENTER, maxSize: 40
      }),
      display: new Label({
        text: 'La bonne réponse était : \n' + answer.name,
        labelWidth: width,
        labelHeight: height / 4,
        align: CENTER,
        color: white,
        maxSize: 30
      }),
      buttons: [
        // {label, color, rollColor, backgroundColor, rollBackgroundColor, call}
        {
          label: labelGoNext,
          width: labelGoNext.width + 10,  /// TODO : margin constants.
          call: () => {
            this.notifyAll(isEqual(proposition, answer));
            this.removeFrom(S);
            S.update();
          }
        }
      ]
    }

    const backgroundColor: GradientColor = isEqual(proposition, answer) ? green : red;
    super(question, content, backgroundColor);

    this.observers = [];
  }

  public subscribe = (observer: Observer): void => {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public notifyAll = (isAnswerCorrect: boolean): void => {
    this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectPlayerAnswered(isAnswerCorrect)));
  }
}
