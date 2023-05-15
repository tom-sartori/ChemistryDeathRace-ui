import { framePaddingProportion, podiumColors, podiumLabelColors } from '@ui-constants/ui-constants';
import { Player } from '@ui-classes/player/player';
import { Label } from '@ui-components/label';

export class Step extends Tile {

  constructor(pos: number, player: Player | undefined) {
    let playerName: string = player ? player.name : '';
    const rankingColor: GradientColor = podiumColors[pos - 1];
    const rectangleLabelColor: GradientColor = podiumLabelColors[pos - 1];
    const playerNameLabel: Label = new Label({
      text: playerName,
      color: rankingColor,
      size: W * framePaddingProportion
    });
    const rectangle: Rectangle = new Rectangle({
      width: (W / 3) - (W / 3) * framePaddingProportion,
      height: (H / 3) / pos,
      color: rankingColor,
    });
    const rectangleLabel: Label = new Label({
      text: pos.toString(),
      color: rectangleLabelColor,
      size: W * framePaddingProportion * 2 / pos
    });
    rectangleLabel.center(rectangle);

    super(
      series([playerNameLabel, rectangle]), // obj
      1, 2,                             // cols, rows
      undefined, undefined,             // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', undefined,              // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );
  }
}
