import { Panel } from '@ui-components/panel';
import { Question } from '@models/question/question.model';
import { Player } from '@ui-classes/player/player';
import { Game } from '@ui-classes/game';
import { QuestionPanelValidation } from '@ui-classes/question-panel/question-panel-validation';

export class QuestionPanelChallengeAnswer extends Panel {

  constructor(question: Question, game: Game, player: Player) {
    super({
      titleBar: question.category,
      header: question.name,
      message: `C'est au tour de ${player.name} de répondre. `,
      buttons: [
        {
          text: 'Afficher la réponse',
          function: (): void => this.switchTo(new QuestionPanelValidation(question, game, player)),
          backgroundColor: player.pawn.color
        }
      ]
    })
  }
}
