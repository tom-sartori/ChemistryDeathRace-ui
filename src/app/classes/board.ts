import {Space} from './space';
import {Pawn} from "./pawn";
import {UIConstants} from "../constant/UIConstants";
import GradientColor = zim.GradientColor;

export class Board extends Container {

  private readonly board: Space[];
  private readonly pawns: Pawn[];

  private startSpace: Space;
  private endSpace: Space;

  private startAndEndIndex: number[] = [0, 41];
  private pipeIndex: number[] = [8, 14, 23, 35];


  constructor(pawns: Array<Pawn>) {
    super();
    const spaceColors: GradientColor[] = [pink, green, orange, blue, yellow, brown];
    this.board = [];

    for (let i: number = 0; i < 42; i++) {
      if (this.startAndEndIndex.includes(i)) {
        this.board.push(new Space(50, 50, darker, (i + 1).toString()));
      } else if (this.pipeIndex.includes(i)) {
        this.board.push(new Space(50, 50, UIConstants.pipeBackgroundColor, (i + 1).toString()));
      } else {
        this.board.push(new Space(50, 50, spaceColors[i % 6], (i + 1).toString()));
      }
    }

    this.startSpace = this.board[0];
    this.endSpace = this.board[41];

    this.pawns = pawns;

    for (let i: number = 0; i < pawns.length; i++) {
      this.startSpace.addPawn(pawns[i]);
    }

    let x = 0;
    let y = 0;
    let row = 1;
    let column = 1;
    for (let i = 0; i < 42; i++) {
      this.board[i].pos(x, y).addTo(this);
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

  public movePawn(pawnNumber: number, spaces: number) {
    let pawn: Pawn = this.pawns[pawnNumber];

    let currentSpaceIndex: number = this.board.findIndex(space => space.pawns.includes(pawn));
    if (currentSpaceIndex == -1) {
      throw new Error("board.ts movePawn(...) : space not found. ");
    }

    this.board[currentSpaceIndex].removePawn(pawn);

    /// TODO : constants.
    let newSpaceIndex: number = currentSpaceIndex + spaces;
    if (newSpaceIndex > 41) {
      newSpaceIndex = 41;
    }
    else if (newSpaceIndex < 0) {
      newSpaceIndex = 0;
    }
    else if (this.pipeIndex[0] === newSpaceIndex || this.pipeIndex[2] === newSpaceIndex) {
      newSpaceIndex += 3;
    }
    else if (this.pipeIndex[1] === newSpaceIndex || this.pipeIndex[3] === newSpaceIndex) {
      newSpaceIndex -= 3;
    }
    let newSpace: Space = this.board[newSpaceIndex];
    newSpace.addPawn(pawn);
  }
}
