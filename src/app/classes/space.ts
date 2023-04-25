import { Pawn } from "./pawn";
import { SpaceDisplay } from '../constant/space-display';
import { pipeBackgroundColor, spaceCornerRadius, spaceHeight, spaceMargin, spaceWidth } from '../constant/ui-constants';
import GradientColor = zim.GradientColor;

const isEqual = require('lodash/isEqual.js');

export class Space extends Rectangle {

  public pawns: Pawn[];

  constructor(color: GradientColor, text: string, spaceDisplay: SpaceDisplay = SpaceDisplay.HORIZONTAL) {
    let height: number = spaceHeight;
    let corner: number[];   // [topLeft, topRight, bottomRight, bottomLeft]
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
    super(spaceWidth, height, color, undefined, undefined, corner);

    this.pawns = [];

    new Label({
      text,
      color: black,
      size: 10,
    }).center(this);

    if (isEqual(color, pipeBackgroundColor)) {
      new Label({
        text: "Tunnel",
        color: black,
        size: 10,
        width: spaceWidth
      }).center(this)
        .mov(0, spaceHeight / 2 - 15);
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
}
