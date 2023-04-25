export class PlayerNameGroup extends Tile {

  private playerName: string;
  private playerNameLabel: Label;

  constructor(playerName: string) {

    // Player label.
    let text: Label = new Label({
      text: "Joueur actuel",
      size: 15,
      bold: true,
      color: white
    });

    // Player name label.
    const tmpPlayerNameLabel = new Label({
      text: playerName,
      size: 15,
      bold: false,
      color: white
    });

    super(
      series([text, tmpPlayerNameLabel]), // obj
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

    this.playerName = playerName;
    this.playerNameLabel = tmpPlayerNameLabel;
  }

  public updatePlayerName(playerName: string) {
    this.playerName = playerName;
    this.playerNameLabel.text = this.playerName;
  }
}
