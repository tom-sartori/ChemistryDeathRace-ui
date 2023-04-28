import { Question } from '@models/question/question.model';
import { Proposition } from '@models/question/proposition.model';
import { Observable } from '@app/ui/observers/observable';
import { Observer } from '@app/ui/observers/observer';
import { Panel } from '@ui-components/panel';
import { ObservableSubjectPlayerAnswered } from '@observers/observable-subject';
import { isEqual } from 'lodash';
import { Game } from '@classes/game';

export class QuestionPanelResult extends Panel implements Observable {

  private observers: Observer[];

  constructor(question: Question, proposition: Proposition, observer: Game) {
    const answer: Proposition = question.propositions.find(proposition => proposition.answer)!;

    super({
      titleBar: question.category,
      header: question.name,
      message: 'La bonne réponse était : \n' + answer.name,
      backgroundColor: isEqual(proposition, answer) ? green : red,
      buttons: [
        {
          text: 'Passer à la suite',
          function: (): void => {
            this.notifyAll(isEqual(proposition, answer));
            this.switchTo();
          }
        }
      ]
    });

    this.observers = [];
    this.subscribe(observer);
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
