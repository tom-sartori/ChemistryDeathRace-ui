import { QuestionPanel } from '@classes/question-panel';
import { Question } from '@models/question/question.model';
import { framePadding } from '@constants/ui-constants';
import { Proposition } from '@models/question/proposition.model';

export const isEqual = require('lodash/isEqual.js');

export class QuestionPanelResult extends QuestionPanel {

  constructor(question: Question, proposition: Proposition) {
    const width: number = W - (framePadding * 2);
    const height: number = H - (framePadding * 2);
    const answer: Proposition = question.propositions.find(proposition => proposition.answer)!;

    const content = {
      header: new Label({
        text: question.name, labelWidth: width, labelHeight: height / 4, align: CENTER, maxSize: 40
      }),
      display: new Label({
        text: 'La bonne réponse était : \n' + answer.name,
        labelWidth: width,
        labelHeight: height / 4,
        align: CENTER,
        color: white,
        maxSize: 30
      })
    }

    const backgroundColor: GradientColor = isEqual(proposition, answer) ? green : red;
    super(question, content, backgroundColor);
  }
}
