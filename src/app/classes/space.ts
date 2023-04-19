import {Pawn} from "./pawn";
import {UIConstants} from "../constant/UIConstants";
import GradientColor = zim.GradientColor;

const isEqual = require('lodash/isEqual.js');

export class Space extends Rectangle {

  public pawns: Pawn[];

  constructor(height: number, width: number, color: GradientColor, text: string) {
    super(width, height, color, black);
    this.pawns = [];

    new Label({
      text,
      color: black,
      size: 10,
    }).center(this);

    if (isEqual(color, UIConstants.pipeBackgroundColor)) {
      new Label({
        text: "Tunnel",
        color: black,
        size: 10,
      })
        .pos(10, 37)
        .addTo(this);
    }
  }

  public addPawn(pawn: Pawn): void {
    this.pawns.push(pawn);
    pawn.addTo(this);
    this.displayPawns();
  }

  public removePawn(pawn: Pawn): void {
    this.pawns = this.pawns.filter(p => !isEqual(p, pawn));
    pawn.removeFrom(this);
  }

  private displayPawns(): void {
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
        this.pawns[1].pos(this.pawns[1].radius, this.height / 2)
        this.pawns[2].pos(this.width / 2, this.height / 2)
        break;
      case 4:
        this.pawns[0].pos(this.pawns[0].radius, this.pawns[0].radius)
        this.pawns[1].pos(this.width / 2, this.pawns[1].radius)
        this.pawns[2].pos(this.pawns[2].radius, this.height / 2)
        this.pawns[3].pos(this.width / 2, this.height / 2)
        break;
    }
  }
}
