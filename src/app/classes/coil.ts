import { boardCols, boardRows, numberOfSpaces } from '../constant/game-constants';
import { Space } from './space';
import { Pawn } from './pawn';
import { timeBetweenMove } from '../constant/ui-constants';
import { Observable } from '../interfaces/observable';
import { Observer } from '../interfaces/observer';

export class Coil extends Tile implements Observable {

  private _isMoving: boolean = false;
  private observers: Observer[] = [];

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
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  subscribe(observer: Observer): void {
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
    } else {
      this.notify(); // Notify observers that the pawn has moved.
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


  get isMoving(): boolean {
    return this._isMoving;
  }

  set isMoving(value: boolean) {
    this._isMoving = value;
  }
}
