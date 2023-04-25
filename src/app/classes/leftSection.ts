import { DiceGroup } from './diceGroup';
import { PlayerNameGroup } from './playerNameGroup';
import { Observer } from '../interfaces/observer';

export class LeftSection extends Tile {

  private diceGroup: DiceGroup;
  private playerNameGroup: PlayerNameGroup;

  constructor(currentPlayerName: string, diceSize: number) {

    const diceGroup = new DiceGroup(diceSize);
    const playerNameGroup = new PlayerNameGroup(currentPlayerName);

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

  public updatePlayerName(name: string) {
    this.playerNameGroup.updatePlayerName(name);
  }

  public subscribe(observer: Observer): void {
    this.diceGroup.subscribe(observer);
  }

  public disableDiceButton() {
    this.diceGroup.disableRollButton();
  }

  public enableDiceButton() {
    this.diceGroup.enableRollButton();
  }
}