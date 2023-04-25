import { Pawn } from "./pawn";

export class Player {

  public readonly id: number;
  public readonly name: string;
  public pawn: Pawn;

  constructor(id: number, name: string, pawn: Pawn) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
  }
}
