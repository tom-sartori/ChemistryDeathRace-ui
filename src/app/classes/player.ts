import {Pawn} from "./pawn";

export class Player {

  public readonly id: number;
  private name: string;
  private pawn: Pawn;

  constructor(id: number, name: string, pawn: Pawn) {
    this.id = id;
    this.name = name;
    this.pawn = pawn;
  }
}
