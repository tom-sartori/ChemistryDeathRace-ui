import { Question } from '@models/question/question.model';
import { Game } from '@classes/game';
import { Panel } from '@ui-components/panel';
import { QuestionPanelClassic } from '@classes/question-panel/question-panel-classic';

export class QuestionPanelShowQuestion extends Panel {

  constructor(question: Question, observer: Game) {
    super({
      titleBar: question.category,
      buttons: [
        {
          text: 'Montrer la question',
          function: (): void => this.switchTo(new QuestionPanelClassic(question, observer))
        }
      ]
    });
  }
}
