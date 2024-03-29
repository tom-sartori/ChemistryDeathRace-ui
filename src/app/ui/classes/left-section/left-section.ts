import { DiceGroup } from '@ui-classes/left-section/dice-group/dice-group';
import { PlayerNameGroup } from '@ui-classes/left-section/player-group/player-name-group';
import { Player } from '@ui-classes/player/player';
import { labelSizeProportion } from '@ui-constants/ui-constants';
import { Observer } from '@ui-observers/observer';

export class LeftSection extends Tile {

  private diceGroup: DiceGroup;
  private playerNameGroup: PlayerNameGroup;

  constructor(currentPlayer: Player, diceSize: number) {

    const diceGroup: DiceGroup = new DiceGroup(diceSize);
    const playerNameGroup: PlayerNameGroup = new PlayerNameGroup(currentPlayer.name, currentPlayer.pawn.color);

    let obj: any;
    let rows: number;

    if (W > H) { // Mode paysage.
      const gameLogo: Pic = new Pic("logos/game_logo_freckle.png").siz(playerNameGroup.height);
      const umLogo: Pic = new Pic("logos/logo_um.png").siz(playerNameGroup.height * 2 / 3);
      const enscmLogo: Pic = new Pic("logos/logo_enscm_bleu.png").siz(playerNameGroup.height * 2 / 3);
      const institutionGroup: Tile = new Tile(
        series([umLogo, enscmLogo]),
        2, 1,
        umLogo.width / 4, undefined,
        undefined,
        undefined, undefined,
        undefined, undefined,
        undefined, undefined,
        "center", "center",
        undefined,
        undefined, undefined, undefined,
        false
      );
      obj = series([institutionGroup, playerNameGroup, diceGroup, gameLogo]);
      rows = 4;
    }
    else {
      obj = series([playerNameGroup, diceGroup]);
      rows = 2;
    }

    super(
      obj, // obj
      1, rows,                             // cols, rows
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
