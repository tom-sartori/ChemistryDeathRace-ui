import { Panel } from '@ui-components/panel';
import { Game } from '@ui-classes/game';
import { Question } from '@models/question/question.model';
import { Proposition } from '@models/question/proposition.model';
import { Player } from '@ui-classes/player/player';
import { QuestionPanelResult } from '@ui-classes/question-panel/question-panel-result';

export class QuestionPanelValidation extends Panel {

  constructor(question: Question, game: Game, player: Player) {
    const answer: Proposition = question.propositions.find(proposition => proposition.answer)!;

    super({
      titleBar: question.category,
      header: question.name,
      message: 'La bonne réponse était : \n' + answer.name,
      buttons: [
        {
          text: `${player.name} a bien répondu`,
          function: (): void => this.switchTo(new QuestionPanelResult(question, game, true, player)),
          backgroundColor: green
        },
        {
          text: `${player.name} a mal répondu`,
          function: (): void => this.switchTo(new QuestionPanelResult(question, game, false, player)),
          backgroundColor: red
        }
      ]
    });
  }
}
