import { Question } from '../models/question/question.model';
import { QuestionPanel } from './question-panel';
import { QuestionPanelClassic } from './question-panel-classic';

export class QuestionPanelShowQuestion extends QuestionPanel {

  constructor(question: Question) {
    const label: Label = new Label('Montrer la question');

    const content = {
      buttons: [
        // {label, color, rollColor, backgroundColor, rollBackgroundColor, call}
        {
          label: label,
          width: label.width + 10,  /// TODO : margin constant.
          call: () => {
            /// TODO : function to switch to the question panel.
            new QuestionPanelClassic(question).center();
            this.removeFrom(S);
            S.update();
          }
        }
      ]
    }

    super(question, content);
  }
}
