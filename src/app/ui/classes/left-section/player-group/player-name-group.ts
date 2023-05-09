import { labelSizeProportion } from '@ui-constants/ui-constants';

export class PlayerNameGroup extends Tile {

  private playerNameLabel: Label;

  constructor(playerName: string, playerColor: GradientColor) {

    const labelSize: number = W * labelSizeProportion;

    // Player label.
    let text: Label = new Label({
      text: "Joueur actuel",
      size: labelSize,
      bold: true,
      color: white,
      font: "Freckle Face",
      align: 'center',
    });

    // Player name label.
    const playerNameLabel: Label = new Label({
      text: playerName,
      size: labelSize,
      bold: true,
      color: playerColor,
      font: "Freckle Face",
      align: 'center',
    });

    super(
      series([text, playerNameLabel]), // obj
      1, 2,                             // cols, rows
      undefined, 10,                    // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', undefined,              // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );

    this.playerNameLabel = playerNameLabel;
  }

  public updatePlayerName(playerName: string, playerColor: GradientColor): void {
    this.playerNameLabel.text = playerName;
    this.playerNameLabel.color = playerColor;
    S.update();
  }
}
