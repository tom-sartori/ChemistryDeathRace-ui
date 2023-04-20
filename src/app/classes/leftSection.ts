import { DiceGroup } from './diceGroup';
import { PlayerNameGroup } from './playerNameGroup';

export class LeftSection extends Tile {

  public diceGroup: DiceGroup;

  private playerNameGroup: PlayerNameGroup;

  constructor(currentPlayerName: string, diceSize: number) {

    const tmpDiceGroup = new DiceGroup(diceSize);
    const tmpPlayerNameGroup = new PlayerNameGroup(currentPlayerName);

    super(
      series([tmpPlayerNameGroup, tmpDiceGroup]), // obj
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
    this.playerNameGroup = tmpPlayerNameGroup;
    this.diceGroup = tmpDiceGroup;
  }

  updatePlayerName(name: string) {
    this.playerNameGroup.updatePlayerName(name);
  }
}
