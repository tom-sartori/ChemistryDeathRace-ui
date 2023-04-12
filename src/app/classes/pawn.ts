import {Space} from "./space";

export class Pawn extends Container {

  private _pawnId: number;
  private _pawnRadius: number;
  private _pawnColor: string;

  private _circle: Circle;

  constructor(pawnId: number, pawnRadius: number, pawnColor: string) {
    super();
    this._pawnId = pawnId;
    this._pawnRadius = pawnRadius;
    this._pawnColor = pawnColor;
    this._circle = new Circle(this._pawnRadius, this._pawnColor);
  }


  get pawnId(): number {
    return this._pawnId;
  }

  set pawnId(value: number) {
    this._pawnId = value;
  }

  get pawnRadius(): number {
    return this._pawnRadius;
  }

  set pawnRadius(value: number) {
    this._pawnRadius = value;
  }

  get pawnColor(): string {
    return this._pawnColor;
  }

  set pawnColor(value: string) {
    this._pawnColor = value;
  }


  get circle(): Circle {
    return this._circle;
  }

  set circle(value: Circle) {
    this._circle = value;
  }
}
