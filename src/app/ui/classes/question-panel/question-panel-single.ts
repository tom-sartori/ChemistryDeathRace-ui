import { Panel } from '@ui-components/panel';
import { Question } from '@models/question/question.model';
import { Game } from '@ui-classes/game';
import { QuestionPanelValidation } from '@ui-classes/question-panel/question-panel-validation';

export class QuestionPanelSingle extends Panel {

  constructor(question: Question, game: Game) {
    super({
      titleBar: question.category,
      header: question.name,
      message: `C'est au tour de ${game.currentPlayer.name} de répondre. `,
      buttons: [
        {
          text: 'Afficher la réponse',
          function: (): void => this.switchTo(new QuestionPanelValidation(question, game, game.currentPlayer)),
          backgroundColor: game.currentPlayer.pawn.color
        }
      ]
    });
  }
}
