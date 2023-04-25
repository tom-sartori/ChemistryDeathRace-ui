import { Pawn } from "@classes/pawn";
import { pipeBackgroundColor, spaceColors } from "@constants/ui-constants";
import { SpaceDisplay } from '@constants/space-display';
import { Coil } from '@classes/coil';
import { Observer } from '@interfaces/observer';
import { Space } from "./space";

export class Board extends Container {

  private readonly coil: Coil;

  constructor(pawns: Pawn[]) {
    super();

    this.coil = new Coil(this.generateBoard()).addTo(this);
    pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  private generateBoard(): Space[] {
    return [
      new Space(spaceColors[ 6 ], '1', SpaceDisplay.CORNER_LEFT), new Space(spaceColors[ 0 ], '2'), new Space(spaceColors[ 1 ], '3'), new Space(spaceColors[ 2 ], '4'), new Space(spaceColors[ 3 ], '5'), new Space(spaceColors[ 4 ], '6'), new Space(spaceColors[ 5 ], '7', SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 5 ], '14', SpaceDisplay.CORNER_TOP_LEFT), new Space(spaceColors[ 4 ], '13'), new Space(spaceColors[ 3 ], '12'), new Space(spaceColors[ 2 ], '11'), new Space(spaceColors[ 1 ], '10'), new Space(pipeBackgroundColor, '9'), new Space(spaceColors[ 0 ], '8', SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new Space(pipeBackgroundColor, '15', SpaceDisplay.CORNER_BOTTOM_LEFT), new Space(spaceColors[ 0 ], '16'), new Space(spaceColors[ 1 ], '17'), new Space(spaceColors[ 2 ], '18'), new Space(spaceColors[ 3 ], '19'), new Space(spaceColors[ 4 ], '20'), new Space(spaceColors[ 5 ], '21', SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 5 ], '28', SpaceDisplay.CORNER_TOP_LEFT), new Space(spaceColors[ 4 ], '27'), new Space(spaceColors[ 3 ], '26'), new Space(spaceColors[ 2 ], '25'), new Space(pipeBackgroundColor, '24'), new Space(spaceColors[ 1 ], '23'), new Space(spaceColors[ 0 ], '22', SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new Space(spaceColors[ 0 ], '29', SpaceDisplay.CORNER_BOTTOM_LEFT), new Space(spaceColors[ 1 ], '30'), new Space(spaceColors[ 2 ], '31'), new Space(spaceColors[ 3 ], '32'), new Space(spaceColors[ 4 ], '33'), new Space(spaceColors[ 5 ], '34'), new Space(spaceColors[ 0 ], '35', SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 6 ], '42', SpaceDisplay.CORNER_LEFT), new Space(spaceColors[ 5 ], '41'), new Space(spaceColors[ 4 ], '40'), new Space(spaceColors[ 3 ], '39'), new Space(spaceColors[ 2 ], '38'), new Space(spaceColors[ 1 ], '37'), new Space(pipeBackgroundColor, '36', SpaceDisplay.CORNER_BOTTOM_RIGHT),
    ];
  }

  public movePawn(pawn: Pawn, nbSpacesToMove: number): void {
    this.coil.movePawn(pawn, nbSpacesToMove);
  }

  private addPawn(index: number, pawn: Pawn): void {
    this.coil.addPawn(index, pawn);
  }

  public subscribe(observer: Observer): void {
    this.coil.subscribe(observer);
  }
}
