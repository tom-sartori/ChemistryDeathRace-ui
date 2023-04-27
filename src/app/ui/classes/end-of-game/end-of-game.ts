import { framePaddingProportion } from '@constants/ui-constants';

export class EndOfGame extends Tile {

  constructor(ranking: Player[]) {

    const backButtonLabel: Label = new Label({
      text: 'Quitter',
      color: white,
      size: (W / 3) * framePaddingProportion,
      font: "Freckle Face"
    });
    const backButton: Button = new Button({
      label: backButtonLabel,
      backgroundColor: 'red',
    }).tap(() => {
      window.location.href = '/';
    });

    const newGameButtonLabel: Label = new Label({
      text: 'Nouvelle partie',
      color: white,
      size: (W / 3) * framePaddingProportion,
      font: "Freckle Face"
    });
    const newGameButton: Button = new Button({
      label: newGameButtonLabel,
      backgroundColor: 'green',
    }).tap(() => {
      window.location.href = '/game-test';
    });

    const buttonContainer: Tile = new Tile({
      obj: series([backButton, newGameButton]),
      cols: 2,
      rows: 1,
      spacingH: 60,
      align: 'center',
      valign: 'bottom',
      clone: false
    });

    const emitter: Emitter = new Emitter({
      obj: new Circle({
        radius: 10,
        color: backgroundColorLighter,
      }),
      width: W,
      height: H,
      force: 20,
      num: 4
    });

    super(
      series([new Podium(ranking), buttonContainer]), // obj
      1, 2,                             // cols, rows
      undefined, 60,                    // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', 'center',               // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );

    emitter.centerReg();
  }
}
