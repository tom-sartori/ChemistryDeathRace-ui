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
    this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectPawnMoved(space)));
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
  }

  /**
   * Recursive function to move a pawn.
   *
   * @param pawn the pawn to move.
   * @param spaceIndex the index of the space where the pawn is.
   * @param nbSpacesToMove Can be negative if the pawn is going backward.
   */
  private movePawnAux(pawn: Pawn, spaceIndex: number, nbSpacesToMove: number): void {
    if (nbSpacesToMove === 0) {
      this.notifyAll(this.getSpace(spaceIndex)); // Notify observers that the pawn has moved.
      return; // Stop the recursion.
    }

    const newSpaceIndex: number = nbSpacesToMove > 0 ? this.getNextSpaceIndexForward(spaceIndex) : this.getNextSpaceIndexBackward(spaceIndex);
    if (newSpaceIndex === 0 || newSpaceIndex === numberOfSpaces - boardCols) {
      // We move the pawn to the first or last space. So it can not move anymore.
      nbSpacesToMove = 0;
    }
    else {
      nbSpacesToMove = nbSpacesToMove > 0 ? nbSpacesToMove - 1 : nbSpacesToMove + 1;
    }

    this.switchPawn(pawn, spaceIndex, newSpaceIndex);
    setTimeout(() => this.movePawnAux(pawn, newSpaceIndex, nbSpacesToMove), timeBetweenMove);
  }

  private switchPawn(pawn: Pawn, oldSpaceIndex: number, newSpaceIndex: number) {
    this.removePawn(oldSpaceIndex, pawn);
    this.addPawn(newSpaceIndex, pawn);
  }

  private getNextSpaceIndexForward(index: number): number {
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

  private getNextSpaceIndexBackward(index: number): number {
    /// TODO : check lines.
    /// TODO : Check end of board.
    const line: number = Math.floor(index / boardCols);
    const column: number = index % boardCols;
    let nextIndex: number;

    if (line % 2 === 0) { // Pair line
      if (column === 0) { // First column
        nextIndex = index - boardCols; // Go up a line
      }
      else {
        nextIndex = index - 1; // Go left
      }
    }
    else { // Odd line
      if (column === boardCols - 1) { // Last column
        nextIndex = index - boardCols; // Go up a line
      }
      else {
        nextIndex = index + 1; // Go right
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
    for (let i = 0; i < numberOfSpaces; i = this.getNextSpaceIndexForward(i)) {
      if (this.items[i].pawns.length > 0) {
        for (let j = 0; j < this.items[i].pawns.length; j++) {
          pawnRanking.unshift(this.items[i].pawns[j]);
        }
      }
    }
    return pawnRanking;
  }
}
