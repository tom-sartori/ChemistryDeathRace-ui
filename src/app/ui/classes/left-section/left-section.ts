export class LeftSection extends Tile {

  private diceGroup: DiceGroup;
  private playerNameGroup: PlayerNameGroup;

  constructor(currentPlayer: Player, diceSize: number) {

    const diceGroup: DiceGroup = new DiceGroup(diceSize);
    const playerNameGroup: PlayerNameGroup = new PlayerNameGroup(currentPlayer.name, currentPlayer.pawn.color);

    super(
      series([playerNameGroup, diceGroup]), // obj
      1, 2,                             // cols, rows
      undefined, H * labelSizeProportion, // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', undefined,              // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );

    // Set properties.
    this.playerNameGroup = playerNameGroup;
    this.diceGroup = diceGroup;
  }

  public updatePlayerName(player: Player): void {
    this.playerNameGroup.updatePlayerName(player.name, player.pawn.color);
  }

  public subscribe(observer: Observer): void {
    this.diceGroup.subscribe(observer);
  }

  public enableDiceButton(): void {
    this.diceGroup.enableRollButton();
  }
}
