import { pipeBackgroundColor, spaceColors } from "@constants/ui-constants";
import { Observer } from '@app/ui/observers/observer';
import { Coil } from '@classes/board/coil';
import { Pawn } from '@classes/player/pawn';
import { Space } from '@classes/board/space/space';
import { SpaceDisplay } from '@classes/board/space/space-display';

export class Board extends Container {

  private readonly coil: Coil;

  constructor(spaceSideSize: number, pawns: Pawn[], categories: string[]) {
    super();

    this.coil = new Coil(this.generateBoard(spaceSideSize, categories)).addTo(this);
    pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  private generateBoard(spaceSideSize: number, categories: string[]): Space[] {
    return [
      new Space(spaceColors[6], '1', spaceSideSize, SpaceDisplay.CORNER_LEFT, categories[6]), new Space(spaceColors[0], '2', spaceSideSize, undefined, categories[0]), new Space(spaceColors[1], '3', spaceSideSize, undefined, categories[1]), new Space(spaceColors[2], '4', spaceSideSize, undefined, categories[2]), new Space(spaceColors[3], '5', spaceSideSize, undefined, categories[3]), new Space(spaceColors[4], '6', spaceSideSize, undefined, categories[4]), new Space(spaceColors[5], '7', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT, categories[5]),
      new Space(spaceColors[5], '14', spaceSideSize, SpaceDisplay.CORNER_TOP_LEFT, categories[5]), new Space(spaceColors[4], '13', spaceSideSize, undefined, categories[4]), new Space(spaceColors[3], '12', spaceSideSize, undefined, categories[3]), new Space(spaceColors[2], '11', spaceSideSize, undefined, categories[2]), new Space(spaceColors[1], '10', spaceSideSize, undefined, categories[1]), new Space(pipeBackgroundColor, '9', spaceSideSize), new Space(spaceColors[0], '8', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT, categories[0]),
      new Space(pipeBackgroundColor, '15', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_LEFT), new Space(spaceColors[0], '16', spaceSideSize, undefined, categories[0]), new Space(spaceColors[1], '17', spaceSideSize, undefined, categories[1]), new Space(spaceColors[2], '18', spaceSideSize, undefined, categories[2]), new Space(spaceColors[3], '19', spaceSideSize, undefined, categories[3]), new Space(spaceColors[4], '20', spaceSideSize, undefined, categories[4]), new Space(spaceColors[5], '21', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT, categories[5]),
      new Space(spaceColors[5], '28', spaceSideSize, SpaceDisplay.CORNER_TOP_LEFT, categories[5]), new Space(spaceColors[4], '27', spaceSideSize, undefined, categories[4]), new Space(spaceColors[3], '26', spaceSideSize, undefined, categories[3]), new Space(spaceColors[2], '25', spaceSideSize, undefined, categories[2]), new Space(pipeBackgroundColor, '24', spaceSideSize), new Space(spaceColors[1], '23', spaceSideSize, undefined, categories[1]), new Space(spaceColors[0], '22', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT, categories[0]),
      new Space(spaceColors[0], '29', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_LEFT, categories[0]), new Space(spaceColors[1], '30', spaceSideSize, undefined, categories[1]), new Space(spaceColors[2], '31', spaceSideSize, undefined, categories[2]), new Space(spaceColors[3], '32', spaceSideSize, undefined, categories[3]), new Space(spaceColors[4], '33', spaceSideSize, undefined, categories[4]), new Space(spaceColors[5], '34', spaceSideSize, undefined, categories[5]), new Space(spaceColors[0], '35', spaceSideSize, SpaceDisplay.CORNER_TOP_RIGHT, categories[0]),
      new Space(spaceColors[6], '42', spaceSideSize, SpaceDisplay.CORNER_LEFT, categories[6]), new Space(spaceColors[5], '41', spaceSideSize, undefined, categories[5]), new Space(spaceColors[4], '40', spaceSideSize, undefined, categories[4]), new Space(spaceColors[3], '39', spaceSideSize, undefined, categories[3]), new Space(spaceColors[2], '38', spaceSideSize, undefined, categories[2]), new Space(spaceColors[1], '37', spaceSideSize, undefined, categories[1]), new Space(pipeBackgroundColor, '36', spaceSideSize, SpaceDisplay.CORNER_BOTTOM_RIGHT),
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
