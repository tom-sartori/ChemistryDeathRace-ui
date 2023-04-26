import { Question } from '@models/question/question.model';
import { QuestionPanel } from '@classes/question-panel';
import { QuestionPanelClassic } from '@classes/question-panel-classic';
import { Game } from '@classes/game';

export class QuestionPanelShowQuestion extends QuestionPanel {

  constructor(question: Question, observer: Game) {
    const label: Label = new Label({
      text: 'Montrer la question',
      color: white
    });

    const content = {
      buttons: [
        // {label, color, rollColor, backgroundColor, rollBackgroundColor, call}
        {
          label: label,
          width: label.width + 10,  /// TODO : margin constants.
          call: () => {
            /// TODO : function to switch to the question panel.
            new QuestionPanelClassic(question, observer).center();
            this.removeFrom(S);
            S.update();
          }
        }
      ]
    }

    super(question, content);
  }
}
