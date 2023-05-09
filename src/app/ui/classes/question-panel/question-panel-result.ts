import { Question } from '@models/question/question.model';
import { Proposition } from '@models/question/proposition.model';
import { Observable } from '@app/ui/observers/observable';
import { Observer } from '@app/ui/observers/observer';
import { Panel } from '@ui-components/panel';
import { ObservableSubjectChallengeAnswered, ObservableSubjectPlayerAnswered } from '@ui-observers/observable-subject';
import { Game } from '@ui-classes/game';
import { Player } from '@ui-classes/player/player';

export class QuestionPanelResult extends Panel implements Observable {

  private observers: Observer[];

  constructor(question: Question, observer: Game, isAnswerCorrect: boolean, overrideNextPlayer?: Player) {
    const answer: Proposition = question.propositions.find(proposition => proposition.answer)!;

    super({
      titleBar: question.category,
      header: question.name,
      message: 'La bonne réponse était : \n' + answer.name,
      backgroundColor: isAnswerCorrect ? green : red,
      buttons: [
        {
          text: 'Passer à la suite',
          function: (): void => {
            this.notifyAll({isAnswerCorrect, overrideNextPlayer});  // If overrideNextPlayer is set, we come from a challenge question. Otherwise, it's a classic question and we send isAnswerCorrect.
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

  public notifyAll = (config: { isAnswerCorrect: boolean, overrideNextPlayer?: Player }): void => {
    console.log(config);
    if (config.overrideNextPlayer) {
      // Player answered at a challenge. We override the next player.
      this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectChallengeAnswered(config.isAnswerCorrect, config.overrideNextPlayer!)));
    }
    else {
      // Player answered at a classic question. We do not override the next player.
      this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectPlayerAnswered(config.isAnswerCorrect)));
    }
  }
}
