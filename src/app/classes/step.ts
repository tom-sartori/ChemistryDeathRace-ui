import { Player } from '@classes/player';
import { framePaddingProportion, podiumColors, podiumLabelColors } from '@constants/ui-constants';

export class Step extends Tile {

  constructor(pos: number, player: Player | undefined) {
    let playerName: string = player ? player.name : '';
    const rankingColor: GradientColor = podiumColors[ pos - 1 ];
    const rectangleLabelColor: GradientColor = podiumLabelColors[ pos - 1 ];
    const playerNameLabel: Label = new Label({
      text: playerName,
      color: rankingColor,
      size: W * framePaddingProportion,
      font: "Freckle Face"
    });
    const rectangle: Rectangle = new Rectangle({
      width: (W / 3) - (W / 3) * framePaddingProportion,
      height: (H / 3) / pos,
      color: rankingColor,
    });
    const rectangleLabel: Label = new Label({
      text: pos.toString(),
      color: rectangleLabelColor,
      size: W * framePaddingProportion * 2 / pos,
      font: "Freckle Face"
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
