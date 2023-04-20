import { Pawn } from "./pawn";

export class Player {

  public readonly id: number;
  private _name: string;
  public pawn: Pawn;

  constructor(id: number, name: string, pawn: Pawn) {
    this.id = id;
    this._name = name;
    this.pawn = pawn;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
