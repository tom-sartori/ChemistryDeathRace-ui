export class PlayerNameGroup extends Tile {

  private playerNameLabel: Label;

  constructor(playerName: string, playerColor: GradientColor) {

    // Player label.
    let text: Label = new Label({
      text: "Joueur actuel",
      size: 20,
      bold: true,
      color: white,
      font: "Freckle Face"
    });

    // Player name label.
    const playerNameLabel: Label = new Label({
      text: playerName,
      size: 20,
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
