import { Panel } from '@ui-components/panel';
import { Question } from '@models/question/question.model';
import { Game } from '@ui-classes/game';
import { QuestionPanelChallengeAnswer } from '@ui-classes/question-panel/question-panel-challenge-answer';
import { Player } from '@ui-classes/player/player';

export class QuestionPanelChallengeBuzzer extends Panel {

  constructor(question: Question, game: Game) {

    const buttons: { text: string, function: Function, backgroundColor?: GradientColor }[] = [];
    game.players.forEach((player: Player): void => {
      buttons.push({
        text: player.name,
        function: () => this.switchTo(new QuestionPanelChallengeAnswer(question, game, player)),
        backgroundColor: player.pawn.color
      });
    });

    super({
      titleBar: question.category,
      header: question.name,
      buttons: buttons
    });
  }
}
