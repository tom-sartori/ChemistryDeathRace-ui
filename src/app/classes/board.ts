import { Space } from './space';
import { Pawn } from "./pawn";
import { pipeBackgroundColor, spaceColors } from "../constant/ui-constants";
import { SpaceDisplay } from '../constant/space-display';
import { Coil } from './coil';

export class Board extends Container {

  private readonly coil: Coil;

  constructor(pawns: Pawn[]) {
    super();

    this.coil = new Coil(this.generateBoard()).center();
    pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  private generateBoard(): Space[] {
    return [
      new Space(spaceColors[6], '1'), new Space(spaceColors[0], '2'), new Space(spaceColors[1], '3'), new Space(spaceColors[2], '4'), new Space(spaceColors[3], '5'), new Space(spaceColors[4], '6'), new Space(spaceColors[5], '7', SpaceDisplay.CORNER),
      new Space(spaceColors[5], '14', SpaceDisplay.CORNER), new Space(spaceColors[4], '13'), new Space(spaceColors[3], '12'), new Space(spaceColors[2], '11'), new Space(spaceColors[1], '10'), new Space(pipeBackgroundColor, '9'), new Space(spaceColors[0], '8'),
      new Space(pipeBackgroundColor, '15'), new Space(spaceColors[0], '16'), new Space(spaceColors[1], '17'), new Space(spaceColors[2], '18'), new Space(spaceColors[3], '19'), new Space(spaceColors[4], '20'), new Space(spaceColors[5], '21', SpaceDisplay.CORNER),
      new Space(spaceColors[5], '28', SpaceDisplay.CORNER), new Space(spaceColors[4], '27'), new Space(spaceColors[3], '26'), new Space(spaceColors[2], '25'), new Space(pipeBackgroundColor, '24'), new Space(spaceColors[1], '23'), new Space(spaceColors[0], '22'),
      new Space(spaceColors[0], '29'), new Space(spaceColors[1], '30'), new Space(spaceColors[2], '31'), new Space(spaceColors[3], '32'), new Space(spaceColors[4], '33'), new Space(spaceColors[5], '34'), new Space(spaceColors[0], '35', SpaceDisplay.CORNER),
      new Space(spaceColors[6], '42'), new Space(spaceColors[5], '41'), new Space(spaceColors[4], '40'), new Space(spaceColors[3], '39'), new Space(spaceColors[2], '38'), new Space(spaceColors[1], '37'), new Space(pipeBackgroundColor, '36'),
    ];
  }

  public movePawn(pawn: Pawn, nbSpacesToMove: number): void {
    this.coil.movePawn(pawn, nbSpacesToMove);
  }

  private addPawn(index: number, pawn: Pawn): void {
    this.coil.addPawn(index, pawn);
  }
}
