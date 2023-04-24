import { Question } from '../models/question/question.model';
import {
  framePadding,
  questionPanelBackgroundColor,
  questionPanelPadding,
} from '../constant/ui-constants';
import GradientColor = zim.GradientColor;

export abstract class QuestionPanel extends Panel {

  /// TODO : content type.
  protected constructor(question: Question, content: any, backgroundColor: GradientColor = questionPanelBackgroundColor) {
    const width: number = W - (framePadding * 2);
    const height: number = H - (framePadding * 2);
    const margin: number = questionPanelPadding; // margin for panel boundary

    super({
      width, height,
      titleBar: question.category,
      backgroundColor: backgroundColor,
      draggable: true,
      boundary: new Boundary(0, 0, W, H).contract(margin, margin, width + margin, height + margin),
      content
    });
  }
}
