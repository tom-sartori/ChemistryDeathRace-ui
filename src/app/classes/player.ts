import { Pawn } from "./pawn";

export class Player {

  public readonly name: string;
  public pawn: Pawn;

  constructor(name: string, pawn: Pawn) {
    this.name = name;
    this.pawn = pawn;
  }
}
