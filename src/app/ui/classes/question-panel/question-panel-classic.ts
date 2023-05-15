import { Question } from '@models/question/question.model';
import { Proposition } from '@models/question/proposition.model';
import { Game } from '@ui-classes/game';
import { Panel } from '@ui-components/panel';
import { QuestionPanelResult } from '@ui-classes/question-panel/question-panel-result';
import { shuffle } from 'lodash';

export class QuestionPanelClassic extends Panel {

  constructor(question: Question, observer: Game) {
    const buttons: { text: string, function: Function }[] = [];
    question.propositions.forEach((proposition: Proposition): void => {
      buttons.push({
        text: proposition.name,
        function: () => this.switchTo(new QuestionPanelResult(question, observer, proposition.answer))
      });
    });

    super({
      titleBar: question.category,
      header: question.name,
      buttons: shuffle(buttons)
    });
  }
}
