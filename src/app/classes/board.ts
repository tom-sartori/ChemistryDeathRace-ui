import { Pawn } from "@classes/pawn";
import { pipeBackgroundColor, spaceColors } from "@constants/ui-constants";
import { SpaceDisplay } from '@constants/space-display';
import { Coil } from '@classes/coil';
import { Observer } from '@interfaces/observer';
import { Space } from "./space";

export class Board extends Container {

  private readonly coil: Coil;

  constructor(spaceSideSize: number, pawns: Pawn[]) {
    super();

    this.coil = new Coil(this.generateBoard(spaceSideSize)).addTo(this);
    pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  private generateBoard(spaceSideSize: number): Space[] {
    return [
      new Space(spaceColors[ 6 ], '1', spaceSideSize, SpaceDisplay.CORNER_LEFT), new Space(spaceColors[ 0 ], '2', spaceSideSize), new Space(spaceColors[ 1 ], '3', spaceSideSize), new Space(spaceColors[ 2 ], '4', spaceSideSize), new Space(spaceColors[ 3 ], '5', spaceSideSize), new Space(spaceColors[ 4 ], '6', spaceSideSize), new Space(spaceColors[ 5 ], '7', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 5 ], '14', spaceSideSize, SpaceDisplay.CORNER_TOP_LEFT), new Space(spaceColors[ 4 ], '13', spaceSideSize), new Space(spaceColors[ 3 ], '12', spaceSideSize), new Space(spaceColors[ 2 ], '11', spaceSideSize), new Space(spaceColors[ 1 ], '10', spaceSideSize), new Space(pipeBackgroundColor, '9', spaceSideSize), new Space(spaceColors[ 0 ], '8', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new Space(pipeBackgroundColor, '15', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_LEFT), new Space(spaceColors[ 0 ], '16', spaceSideSize), new Space(spaceColors[ 1 ], '17', spaceSideSize), new Space(spaceColors[ 2 ], '18', spaceSideSize), new Space(spaceColors[ 3 ], '19', spaceSideSize), new Space(spaceColors[ 4 ], '20', spaceSideSize), new Space(spaceColors[ 5 ], '21', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 5 ], '28', spaceSideSize, SpaceDisplay.CORNER_TOP_LEFT), new Space(spaceColors[ 4 ], '27', spaceSideSize), new Space(spaceColors[ 3 ], '26', spaceSideSize), new Space(spaceColors[ 2 ], '25', spaceSideSize), new Space(pipeBackgroundColor, '24', spaceSideSize), new Space(spaceColors[ 1 ], '23', spaceSideSize), new Space(spaceColors[ 0 ], '22', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new Space(spaceColors[ 0 ], '29', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_LEFT), new Space(spaceColors[ 1 ], '30', spaceSideSize), new Space(spaceColors[ 2 ], '31', spaceSideSize), new Space(spaceColors[ 3 ], '32', spaceSideSize), new Space(spaceColors[ 4 ], '33', spaceSideSize), new Space(spaceColors[ 5 ], '34', spaceSideSize), new Space(spaceColors[ 0 ], '35', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[ 6 ], '42', spaceSideSize, SpaceDisplay.CORNER_LEFT), new Space(spaceColors[ 5 ], '41', spaceSideSize), new Space(spaceColors[ 4 ], '40', spaceSideSize), new Space(spaceColors[ 3 ], '39', spaceSideSize), new Space(spaceColors[ 2 ], '38', spaceSideSize), new Space(spaceColors[ 1 ], '37', spaceSideSize), new Space(pipeBackgroundColor, '36', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT),
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

  public isEndOfBoard(pawn: Pawn): boolean {
    return this.coil.isEndOfBoard(pawn);
  }

  public getPawnRanking(): Pawn[] {
    return this.coil.getPawnRanking();
  }
}
