import { onStopOnSpaceAnimationTimeout, spaceMargin } from '@ui-constants/ui-constants';
import { Pawn } from '@ui-classes/player/pawn';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';
import { isEqual } from 'lodash';
import { Label } from '@ui-components/label';

export class Space extends Rectangle {

  public pawns: Pawn[];

  constructor(color: GradientColor, text: string | undefined, sideSize: number, image: string | undefined = undefined, spaceDisplay: SpaceDisplay = SpaceDisplay.HORIZONTAL) {
    const width: number = sideSize;
    let height: number = sideSize;
    let corner: number[];   // [topLeft, topRight, bottomRight, bottomLeft]
    const spaceCornerRadius: number = width / 2;
    switch (spaceDisplay) {
      case SpaceDisplay.CORNER_TOP_LEFT:
        corner = [spaceCornerRadius, 0, 0, 0];
        height += spaceMargin;
        break;
      case SpaceDisplay.CORNER_TOP_RIGHT:
        corner = [0, spaceCornerRadius, 0, 0];
        height += spaceMargin;
        break;
      case SpaceDisplay.CORNER_BOTTOM_RIGHT:
        corner = [0, 0, spaceCornerRadius, 0];
        break;
      case SpaceDisplay.CORNER_BOTTOM_LEFT:
        corner = [0, 0, 0, spaceCornerRadius];
        break;
      case SpaceDisplay.CORNER_LEFT:
        corner = [spaceCornerRadius, 0, 0, spaceCornerRadius];
        break;
      default:
        corner = [0, 0, 0, 0];
        break;
    }
    super(width, height, color, undefined, undefined, corner);

    this.pawns = [];

    if (text && image) {
      new Label({
        text,
        color: black,
        size: 15
      }).center(this)
        .mov(0, this.height / 2 - 15);
      new Pic(image).siz(width * 0.7).center(this);
    }
    else if (text) {
      new Label({
        text,
        color: black,
        size: 15
      }).center(this);
    }
    else if (image) {
      new Pic(image).siz(width / 1.3).center(this);
    }
  }

  public addPawn(pawn: Pawn): void {
    this.pawns.push(pawn);
    pawn.addTo(this);
    this.displayPawns();
    S.update();
  }

  public removePawn(pawn: Pawn): void {
    this.pawns = this.pawns.filter(p => !isEqual(p, pawn));
    pawn.removeFrom(this);
    this.displayPawns();
    S.update();
  }

  public displayPawns(): void {
    switch (this.pawns.length) {
      case 1:
        this.pawns[0].pos((this.width / 2) - this.pawns[0].radius, (this.height / 2) - this.pawns[0].radius);
        break;
      case 2:
        this.pawns[0].pos(this.pawns[0].radius, this.pawns[0].radius)
        this.pawns[1].pos(this.width - (this.pawns[1].radius * 3), this.height - (this.pawns[1].radius * 3))
        break;
      case 3:
        this.pawns[0].pos((this.width / 2) - this.pawns[0].radius, this.pawns[0].radius)
        this.pawns[1].pos(this.pawns[1].radius, this.height - 3 * this.pawns[1].radius)
        this.pawns[2].pos(this.width - 3 * this.pawns[1].radius, this.height - 3 * this.pawns[1].radius)
        break;
      case 4:
        this.pawns[0].pos(this.pawns[0].radius, this.pawns[0].radius)
        this.pawns[1].pos(this.width - 3 * this.pawns[1].radius, this.pawns[1].radius)
        this.pawns[2].pos(this.pawns[2].radius, this.height - 3 * this.pawns[1].radius)
        this.pawns[3].pos(this.width - 3 * this.pawns[1].radius, this.height - 3 * this.pawns[1].radius)
        break;
    }
  }

  public onStopOnSpace(): void {
    const oldColor: GradientColor = this.color;
    this.color = white;
    S.update();
    setTimeout((): void => {
      this.color = oldColor;
      S.update();
    }, onStopOnSpaceAnimationTimeout);
  }
}
