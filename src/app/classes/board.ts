import { Space } from './space';
import { Pawn } from "./pawn";
import { spaceColors } from "../constant/ui-constants";
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
    let spaceIndex: number = this.tile.items.findIndex(space => space.pawns.includes(pawn));
    if (spaceIndex == -1) {
      throw new Error("board.ts movePawn(...) : space not found. ");
    }
    this.removePawn(spaceIndex, pawn);

    for (let i: number = 0; i < nbSpacesToMove; i++) {
      spaceIndex = this.getNextSpaceIndex(spaceIndex);
      if (spaceIndex >= numberOfSpaces) {
        spaceIndex = numberOfSpaces - boardCols;
        break;
      }
    }

    this.getSpace(spaceIndex).addPawn(pawn);

    /// TODO : if pipe.
    /// TODO : do action with question.
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
      new Space(spaceColors[0], '1'), new Space(spaceColors[0], '2'), new Space(spaceColors[0], '3'), new Space(spaceColors[0], '4'), new Space(spaceColors[0], '5'), new Space(spaceColors[0], '6'), new Space(spaceColors[0], '7', SpaceDisplay.CORNER),
      new Space(spaceColors[0], '14', SpaceDisplay.CORNER), new Space(spaceColors[0], '13'), new Space(spaceColors[0], '12'), new Space(spaceColors[0], '11'), new Space(spaceColors[0], '10'), new Space(spaceColors[0], '9'), new Space(spaceColors[0], '8'),
      new Space(spaceColors[1], '15'), new Space(spaceColors[1], '16'), new Space(spaceColors[1], '17'), new Space(spaceColors[1], '18'), new Space(spaceColors[1], '19'), new Space(spaceColors[1], '20'), new Space(spaceColors[1], '21', SpaceDisplay.CORNER),
      new Space(spaceColors[1], '28', SpaceDisplay.CORNER), new Space(spaceColors[1], '27'), new Space(spaceColors[1], '26'), new Space(spaceColors[1], '25'), new Space(spaceColors[1], '24'), new Space(spaceColors[1], '23'), new Space(spaceColors[1], '22'),
      new Space(spaceColors[2], '29'), new Space(spaceColors[2], '30'), new Space(spaceColors[2], '31'), new Space(spaceColors[2], '32'), new Space(spaceColors[2], '33'), new Space(spaceColors[2], '34'), new Space(spaceColors[2], '35', SpaceDisplay.CORNER),
      new Space(spaceColors[2], '42'), new Space(spaceColors[2], '41'), new Space(spaceColors[2], '40'), new Space(spaceColors[2], '39'), new Space(spaceColors[2], '38'), new Space(spaceColors[2], '37'), new Space(spaceColors[2], '36'),
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
}
