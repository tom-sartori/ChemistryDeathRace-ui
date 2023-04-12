import { Space } from './space';
import {Pawn} from "./pawn";

export class Board extends Container {

  private _board: Array<Space> = [];

  private _pawns: Array<Pawn> = [];

  private _startSpace: Space;
  private _endSpace: Space;

  private startAndEndIndex : number[] = [0, 41];
  private pipeIndex : number[] = [8, 14, 23, 35];


  constructor(pawns: Array<Pawn>) {
    super();
    const spaceColors = [pink, green, orange, blue, yellow, brown];

    for (let i = 0; i < 42; i++) {
      if (this.startAndEndIndex.includes(i)) {
        this._board.push(new Space(i, 50, 50, darker));
      } else if (this.pipeIndex.includes(i)) {
        this._board.push(new Space(i, 50, 50, lighter));
      } else {
        this._board.push(new Space(i, 50, 50, spaceColors[i % 6]));
      }
    }

    this._startSpace = this._board[0];
    this._endSpace = this._board[41];

    this._pawns = pawns;

    for (let i = 0; i < pawns.length; i++) {
      this._startSpace.addPawn(pawns[i]);
    }

    let x = 0;
    let y = 0;
    let row = 1;
    let column = 1;
    for (let i = 0; i < 42; i++) {
      this._board[i].pos(x, y).addTo(this);
      if (row % 2 === 0) {
        x -= 50;
        if (column === 7) {
          row++;
          column = 1;
          x = 0;
          y += 50;
        } else {
          column++;
        }
      } else {
        x += 50;
        if (column === 7) {
          row++;
          column = 1;
          x = 300;
          y += 50;
        } else {
          column++;
        }
      }
    }

  }


  get board(): Array<Space> {
    return this._board;
  }

  set board(value: Array<Space>) {
    this._board = value;
  }

  get startSpace(): Space {
    return this._startSpace;
  }

  set startSpace(value: Space) {
    this._startSpace = value;
  }

  get endSpace(): Space {
    return this._endSpace;
  }

  set endSpace(value: Space) {
    this._endSpace = value;
  }

  get pawns(): Array<Pawn> {
    return this._pawns;
  }

  set pawns(value: Array<Pawn>) {
    this._pawns = value;
  }

  pawn(pawnNumber : number): Pawn {
    return this._pawns[pawnNumber];
  }

  movePawn(pawnNumber: number, spaces: number) {
    let pawn = this.pawn(pawnNumber);
    let currentSpace = this._board.find(space => space.pawns.includes(pawn));
    currentSpace!.removePawn(pawn);

    let newSpaceIndex = currentSpace!.spaceId + spaces;
    if (newSpaceIndex > 41) {
      newSpaceIndex = 41;
    } else if (newSpaceIndex < 0) {
      newSpaceIndex = 0;
    } else if (this.pipeIndex[0] === newSpaceIndex || this.pipeIndex[2] === newSpaceIndex) {
      newSpaceIndex += 3;
    } else if (this.pipeIndex[1] === newSpaceIndex || this.pipeIndex[3] === newSpaceIndex) {
      newSpaceIndex -= 3;
    }
    let newSpace = this._board[newSpaceIndex];
    newSpace.addPawn(pawn);
  }
}
