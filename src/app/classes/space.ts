import {Pawn} from "./pawn";

export class Space extends Container {

  private _spaceId: number;
  private _spaceHeight: number;
  private _spaceWidth: number;
  private _spaceColor: string;

  private _pawns: Pawn[] = [];

  constructor(spaceId: number, spaceHeight: number, spaceWidth: number, spaceColor: string) {
    super();
    this._spaceId = spaceId;
    this._spaceHeight = spaceHeight;
    this._spaceWidth = spaceWidth;
    this._spaceColor = spaceColor;
    const rectangle = new Rectangle(this._spaceWidth, this._spaceHeight, this._spaceColor, black);
    const label = new Label({
      text: (this._spaceId + 1).toString(),
      color: black,
      size: 10,
    });
    label.center(rectangle);
    rectangle.addTo(this);

    if (spaceColor === "#eeeeee") {
      const labelTunnel = new Label({
        text: "Tunnel",
        color: black,
        size: 10,
      });
      labelTunnel.pos(10, 37);
      labelTunnel.addTo(this);
    }
  }


  get spaceId(): number {
    return this._spaceId;
  }

  set spaceId(value: number) {
    this._spaceId = value;
  }

  get spaceHeight(): number {
    return this._spaceHeight;
  }

  set spaceHeight(value: number) {
    this._spaceHeight = value;
  }

  get spaceWidth(): number {
    return this._spaceWidth;
  }

  set spaceWidth(value: number) {
    this._spaceWidth = value;
  }

  get spaceColor(): string {
    return this._spaceColor;
  }

  set spaceColor(value: string) {
    this._spaceColor = value;
  }


  get pawns(): Pawn[] {
    return this._pawns;
  }

  set pawns(value: Pawn[]) {
    this._pawns = value;
  }

  addPawn(pawn: Pawn) {
    this._pawns.push(pawn);
    pawn.circle.addTo(this);
    switch (pawn.pawnId) {
      case 1:
        pawn.circle.pos(5,5);
        break;
      case 2:
        pawn.circle.pos(48 - (pawn.pawnRadius * 2),5);
        break;
      case 3:
        pawn.circle.pos(5,48 - (pawn.pawnRadius * 2));
        break;
      case 4:
        pawn.circle.pos(48 - (pawn.pawnRadius * 2),48 - (pawn.pawnRadius * 2));
        break;
    }
  }

  removePawn(pawn: Pawn) {
    this._pawns = this._pawns.filter(p => p.pawnId !== pawn.pawnId);
    pawn.circle.removeFrom(this);
  }
}
