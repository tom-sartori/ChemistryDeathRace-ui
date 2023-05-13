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
    const gameLogo: Pic = new Pic("logos/logo_game.png").siz(playerNameGroup.height);
    const umLogo: Pic = new Pic("logos/logo_um.png").siz(playerNameGroup.height * 2 / 3);
    const enscmLogo: Pic = new Pic("logos/logo_enscm.png").siz(playerNameGroup.height * 2 / 3);

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


    super(
      series([institutionGroup, playerNameGroup, diceGroup, gameLogo]), // obj
      1, 4,                             // cols, rows
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
