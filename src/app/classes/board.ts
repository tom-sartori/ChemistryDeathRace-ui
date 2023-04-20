import { Space } from './space';
import { Pawn } from "./pawn";
import { pipeBackgroundColor, spaceColors, timeBetweenMove } from "../constant/ui-constants";
import { SpaceDisplay } from '../constant/space-display';
import { boardCols, boardRows, numberOfSpaces } from '../constant/game-constants';

export class Board extends Container {

  private readonly pawns: Pawn[];
  private readonly tile: Tile;

  constructor(pawns: Pawn[]) {
    super();

    this.tile = new Tile({
      obj: series(this.generateBoard()),
      cols: boardCols,
      rows: boardRows,
      align: 'center',
      valign: 'top',
      clone: false
    }).center()

    this.pawns = pawns;
    this.pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  public movePawn(pawn: Pawn, nbSpacesToMove: number): void {
    let spaceIndex: number = this.getSpaces().findIndex(space => space.pawns.includes(pawn));
    if (spaceIndex == -1) {
      throw new Error("board.ts movePawn(...) : space not found. ");
    }

    this.movePawnAux(pawn, spaceIndex, nbSpacesToMove);

    /// TODO : if pipe.
    /// TODO : do action with question.
  }

  private movePawnAux(pawn: Pawn, spaceIndex: number, nbSpacesToMove: number): void {
    if (nbSpacesToMove > 0) {
      let newSpaceIndex: number = this.getNextSpaceIndex(spaceIndex);
      if (newSpaceIndex < numberOfSpaces) {
        // We move the pawn to the next space.
        this.removePawn(spaceIndex, pawn);
        this.addPawn(newSpaceIndex, pawn);
        spaceIndex = newSpaceIndex;

        setTimeout(() => this.movePawnAux(pawn, spaceIndex, nbSpacesToMove - 1), timeBetweenMove);
      }
    }
  }

  private getSpace(index: number): Space {
    return this.tile.items[index] as Space;
  }

  private getSpaces(): Space[] {
    return this.tile.items as Space[];
  }

  private addPawn(index: number, pawn: Pawn): void {
    (this.tile.items[index] as Space).addPawn(pawn);
  }

  private removePawn(index: number, pawn: Pawn): void {
    (this.tile.items[index] as Space).removePawn(pawn);
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

  private getNextSpaceIndex(index: number): number {
    /// TODO : check lines.
    /// TODO : Check end of board.
    const line: number = Math.floor(index / boardCols);
    const column: number = index % boardCols;
    let nextIndex: number;

    if (line % 2 === 0) { // Pair line
      if (column === boardCols - 1) { // Last column
        nextIndex = index + boardCols; // Go down a line
      }
      else {
        nextIndex = index + 1; // Go right
      }
    }
    else { // Odd line
      if (column === 0) { // First column
        nextIndex = index + boardCols; // Go down a line
      }
      else {
        nextIndex = index - 1; // Go left
      }
    }

    return nextIndex;
  }
}
