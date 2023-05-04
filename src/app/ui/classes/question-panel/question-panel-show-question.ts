import { Question } from '@models/question/question.model';
import { Game } from '@classes/game';
import { Panel } from '@ui-components/panel';
import { QuestionPanelClassic } from '@classes/question-panel/question-panel-classic';
import { SpaceClassic } from '@classes/board/space/space-classic';
import { SpaceChallenge } from '@classes/board/space/space-challenge';
import { QuestionPanelChallengeBuzzer } from '@classes/question-panel/question-panel-challenge-buzzer';

export class QuestionPanelShowQuestion extends Panel {

  constructor(question: Question, observer: Game, questionType: typeof SpaceClassic | typeof SpaceChallenge) {
    super({
      titleBar: question.category,
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
