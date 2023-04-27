import { Player } from '@classes/player/player';
import { Step } from '@classes/end-of-game/step';

export class Podium extends Tile {

  constructor(ranking: Player[]) {
    let steps: Step[] = [];
    for (let i = 0; i < 3; i++) {
      if (i < ranking.length) {
        if (i == 1) {
          steps.unshift(new Step(i + 1, ranking[i]));
        }
        else {
          steps.push(new Step(i + 1, ranking[i]));
        }
      }
      else {
        if (i == 1) {
          steps.unshift(new Step(i + 1, undefined));
        }
        else {
          steps.push(new Step(i + 1, undefined));
        }
      }
    }
    super(
      series(steps),                    // obj
      3, 1,                             // cols, rows
      undefined, undefined,             // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', BOTTOM,                 // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );
  }
}
