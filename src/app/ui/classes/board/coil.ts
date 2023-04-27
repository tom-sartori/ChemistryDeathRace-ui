import { boardCols, boardRows, numberOfSpaces } from '@constants/game-constants';
import { timeBetweenMove } from '@constants/ui-constants';
import { Observable } from '@app/ui/observers/observable';
import { Observer } from '@app/ui/observers/observer';
import { Space } from '@classes/board/space/space';
import { ObservableSubjectPawnMoved } from '@observers/observable-subject';
import { Pawn } from '@classes/player/pawn';

export class Coil extends Tile implements Observable {

  private readonly observers: Observer[];

  constructor(spaces: Space[]) {
    super(
      series(spaces),                   // obj
      boardCols, boardRows,             // cols, rows
      undefined, undefined,             // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', 'top',                  // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );

    this.observers = [];
  }

  public notifyAll(space: Space): void {
    this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectPawnMoved(space.category)));
  }

  public subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
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
      else {
        // Pawn arrived at the end of the board.
        this.notifyAll(this.getSpace(spaceIndex)); // Notify observers that the pawn has moved.
      }
    }
    else {
      this.notifyAll(this.getSpace(spaceIndex)); // Notify observers that the pawn has moved.
    }
  }

  public getNextSpaceIndex(index: number): number {
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

  public getSpace(index: number): Space {
    return this.items[index] as Space;
  }

  public getSpaces(): Space[] {
    return this.items as Space[];
  }

  public addPawn(index: number, pawn: Pawn): void {
    (this.items[index] as Space).addPawn(pawn);
  }

  public removePawn(index: number, pawn: Pawn): void {
    (this.items[index] as Space).removePawn(pawn);
  }

  public isEndOfBoard(pawn: Pawn): boolean {
    return this.items[numberOfSpaces - boardCols].pawns.includes(pawn);
  }

  public getPawnRanking(): Pawn[] {
    let pawnRanking: Pawn[] = [];
    for (let i = 0; i < numberOfSpaces; i = this.getNextSpaceIndex(i)) {
      if (this.items[i].pawns.length > 0) {
        for (let j = 0; j < this.items[i].pawns.length; j++) {
          pawnRanking.unshift(this.items[i].pawns[j]);
        }
      }
    }
    return pawnRanking;
  }
}
