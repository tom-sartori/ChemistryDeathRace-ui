import { QuestionPanel } from '@classes/question-panel';
import { Question } from '@models/question/question.model';
import { framePadding } from '@constants/ui-constants';
import { Proposition } from '@models/question/proposition.model';
import { QuestionPanelResult } from '@classes/question-panel-result';

export class QuestionPanelClassic extends QuestionPanel {

  constructor(question: Question) {
    const width: number = W - (framePadding * 2);
    const height: number = H - (framePadding * 2);

    const tileWidth: number = width;
    const tileHeight: number = height / 2;

    const labelWidth: number = tileWidth;
    const labelHeight: number = tileHeight / question.propositions.length;

    const data: Button[] = [];
    question.propositions.forEach((proposition: Proposition) => {
      const label: Label = new Label({
        text: proposition.name,
        labelWidth: labelWidth,
        labelHeight: labelHeight,
        align: CENTER,
        valign: CENTER,
        color: white,
        maxSize: 30
      });
      data.push(
        new Button({label: label, width: labelWidth, height: labelHeight})
          .tap(() => {
            new QuestionPanelResult(question, proposition).center();
            this.removeFrom(S);
            S.update();
          })
      );
    });

    const tile: Tile = new Tile({
      width: tileWidth,
      height: tileHeight,
      spacingV: 10,
      cols: 1,
      rows: question.propositions.length,
      obj: series(data),
      clone: false
    })


    const content = {
      header: new Label({
        text: question.name, labelWidth: width, labelHeight: height / 4, align: CENTER, maxSize: 40
      }),
      display: tile
    }
    super(question, content);
  }
}

// message: "We shall greet you!",
// color: lighter, // override default darker
// display: new TextInput({placeholder: "enter name"}).sca(.7),
// align: CENTER,   // default
// spacingV: 25,    // 20 is default
// spacingH: 10,    // default
// buttonScale: .5, // default
// header: new Label({text: question.name, labelWidth: width, labelHeight: height / 2, align: CENTER}),
// message: question.name,
