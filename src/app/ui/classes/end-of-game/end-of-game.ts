import { blue_enscm } from '@ui-constants/ui-constants';
import { Podium } from '@ui-classes/end-of-game/podium';
import { Player } from '@ui-classes/player/player';
import { min } from 'lodash';
import { Button } from '@ui-components/button';
import { AppConstants } from '@app/app.constants';

export class EndOfGame extends Tile {

  constructor(ranking: Player[]) {

    const backButton: Button = new Button({
      text: 'Quitter',
      backgroundColor: 'red',
    }).tap(() => {
      window.location.href = '/';
    });

    const newGameButton: Button = new Button({
      text: 'Nouvelle partie',
      backgroundColor: 'green',
    }).tap(() => {
      window.location.href = '/game/params';
    });

    const restartGameButton: Button = new Button({
      text: 'Rejouer',
      backgroundColor: 'green',
    }).tap(() => {
      if (localStorage.getItem(AppConstants.LOCAL_STORAGE.GAME_PARAMS)) {
        window.location.href = '/game/play';
      }
      else {
        window.location.href = '/game/params';
      }
    });

    const buttonContainer: Tile = new Tile({
      obj: series([backButton, newGameButton, restartGameButton]),
      cols: 3,
      rows: 1,
      spacingH: 60,
      align: 'center',
      valign: 'bottom',
      clone: false
    });

    const emitter: Emitter = new Emitter({
      obj: new Circle({
        radius: 10,
        color: blue_enscm,
      }),
      width: W,
      height: H,
      force: min([W / 75, H / 75]),
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
