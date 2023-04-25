import { DiceGroup } from '@classes/diceGroup';
import { PlayerNameGroup } from '@classes/playerNameGroup';
import { Observer } from '@interfaces/observer';

export class LeftSection extends Tile {

  private diceGroup: DiceGroup;
  private playerNameGroup: PlayerNameGroup;

  constructor(currentPlayerName: string, diceSize: number) {

    const diceGroup: DiceGroup = new DiceGroup(diceSize);
    const playerNameGroup: PlayerNameGroup = new PlayerNameGroup(currentPlayerName);

    super(
      series([playerNameGroup, diceGroup]), // obj
      1, 2,                             // cols, rows
      undefined, 60,                    // spacingH, spacingV
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

  public updatePlayerName(name: string): void {
    this.playerNameGroup.updatePlayerName(name);
  }

  public subscribe(observer: Observer): void {
    this.diceGroup.subscribe(observer);
  }

  public disableDiceButton(): void {
    this.diceGroup.disableRollButton();
  }

  public enableDiceButton(): void {
    this.diceGroup.enableRollButton();
  }
}
