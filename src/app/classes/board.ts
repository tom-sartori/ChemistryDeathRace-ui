import { Space } from './space';
import { Pawn } from "./pawn";
import { spaceColors, backwardMove, forwardMove, pipeBackgroundColor } from "../constant/ui-constants";
import { SpaceDisplay } from '../constant/space-display';
import { boardCols, boardRows, numberOfSpaces, timeBetweenMove } from '../constant/game-constants';

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

  private getSpace(index: number): Space {
    return this.tile.items[index] as Space;
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
    /// TODO : Refactor english.
    const ligne = Math.floor(index / boardCols);
    const colonne = index % boardCols;
    let indiceSuivant: number;

    if (ligne % 2 === 0) { // Ligne paire
      if (colonne === boardCols - 1) { // Dernière colonne
        indiceSuivant = index + boardCols; // Descendre d'une ligne
      } else {
        indiceSuivant = index + 1; // Aller à droite
      }
    } else { // Ligne impaire
      if (colonne === 0) { // Première colonne
        indiceSuivant = index + boardCols; // Descendre d'une ligne
      } else {
        indiceSuivant = index - 1; // Aller à gauche
      }
    }

    return indiceSuivant;
  }

  public async movePawn(pawn: Pawn, spaces: number) {
    let currentSpaceIndex: number = this.tile.items.findIndex(space => space.pawns.includes(pawn));
    if (currentSpaceIndex == -1) {
      throw new Error("board.ts movePawn(...) : space not found. ");
    }

    let newSpaceIndex = await this.animateMove(pawn, currentSpaceIndex, spaces, timeBetweenMove);

    /// TODO : if pipe.
    /// TODO : questions.
  }

  private async animateMove(pawn: Pawn, currentSpaceIndex: number, spaces: number, timeBetweenMoves: number) : Promise<number> {
    let newSpaceIndex: number = currentSpaceIndex;
    for (let i = 0; i < spaces; i++) {
      newSpaceIndex = this.getNextSpaceIndex(newSpaceIndex);
      if (newSpaceIndex >= numberOfSpaces) {
        break;
      }
      this.removePawn(currentSpaceIndex, pawn);
      this.addPawn(newSpaceIndex, pawn);
      currentSpaceIndex = newSpaceIndex;
      await this.wait(timeBetweenMoves);
    }
    return currentSpaceIndex;
  }

  private wait(ms: number) : Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
