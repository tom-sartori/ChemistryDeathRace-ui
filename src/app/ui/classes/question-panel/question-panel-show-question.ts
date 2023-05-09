import { Question } from '@models/question/question.model';
import { Game } from '@ui-classes/game';
import { Panel } from '@ui-components/panel';
import { QuestionPanelClassic } from '@ui-classes/question-panel/question-panel-classic';
import { SpaceClassic } from '@ui-classes/board/space/space-classic';
import { SpaceChallenge } from '@ui-classes/board/space/space-challenge';
import { QuestionPanelChallengeBuzzer } from '@ui-classes/question-panel/question-panel-challenge-buzzer';

export class QuestionPanelShowQuestion extends Panel {

  constructor(question: Question, observer: Game, questionType: typeof SpaceClassic | typeof SpaceChallenge) {
    let header: string;
    switch (questionType) {
      case SpaceClassic:
        header = 'Question classique pour ' + observer.currentPlayer.name;
        break;
      case SpaceChallenge:
        header = 'Question défi pour tout le monde';
        break;
      default:
        header = '';
        break;
    }
    super({
      titleBar: question.category,
      header,
      buttons: [
        {
          text: 'Montrer la question',
          function: (): void => {
            switch (questionType) {
              case SpaceClassic:
                this.switchTo(new QuestionPanelClassic(question, observer));
                break;
              case SpaceChallenge:
                this.switchTo(new QuestionPanelChallengeBuzzer(question, observer));
                break;
            }
          }
        }
      ]
    });
  }
}
