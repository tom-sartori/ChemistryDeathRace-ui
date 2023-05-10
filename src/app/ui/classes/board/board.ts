import { spaceColors } from "@ui-constants/ui-constants";
import { Observer } from '@app/ui/observers/observer';
import { Coil } from '@ui-classes/board/coil';
import { Pawn } from '@ui-classes/player/pawn';
import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';
import { SpacePipe } from '@ui-classes/board/space/space-pipe';
import { SpaceClassic } from '@ui-classes/board/space/space-classic';
import { SpaceChallenge } from '@ui-classes/board/space/space-challenge';

export class Board extends Container {

  private readonly coil: Coil;

  constructor(spaceSideSize: number, pawns: Pawn[], categories: string[]) {
    super();

    this.coil = new Coil(this.generateBoard(spaceSideSize, categories)).addTo(this);
    pawns.forEach(pawn => this.addPawn(0, pawn));
  }

  private generateBoard(spaceSideSize: number, categories: string[]): Space[] {
    return [
      new Space(spaceColors[6], '1', spaceSideSize, SpaceDisplay.CORNER_LEFT), new SpaceClassic(spaceColors[0], '2', spaceSideSize, categories[0]), new SpaceClassic(spaceColors[1], '3', spaceSideSize, categories[1]), new SpaceClassic(spaceColors[2], '4', spaceSideSize, categories[2]), new SpaceChallenge(spaceColors[3], '5', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[4], '6', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[5], '7', spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_RIGHT),
      new SpaceClassic(spaceColors[5], '14', spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_LEFT), new SpaceClassic(spaceColors[4], '13', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[3], '12', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[2], '11', spaceSideSize, categories[2]), new SpaceChallenge(spaceColors[1], '10', spaceSideSize, categories[1]), new SpacePipe('9', spaceSideSize, -3), new SpaceClassic(spaceColors[0], '8', spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new SpacePipe('15', spaceSideSize, +3, SpaceDisplay.CORNER_BOTTOM_LEFT), new SpaceChallenge(spaceColors[0], '16', spaceSideSize, categories[0]), new SpaceClassic(spaceColors[1], '17', spaceSideSize, categories[1]), new SpaceClassic(spaceColors[2], '18', spaceSideSize, categories[2]), new SpaceClassic(spaceColors[3], '19', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[4], '20', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[5], '21', spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_RIGHT),
      new SpaceChallenge(spaceColors[5], '28', spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_LEFT), new SpaceClassic(spaceColors[4], '27', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[3], '26', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[2], '25', spaceSideSize, categories[2]), new SpacePipe('24', spaceSideSize, -3), new SpaceClassic(spaceColors[1], '23', spaceSideSize, categories[1]), new SpaceClassic(spaceColors[0], '22', spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new SpaceClassic(spaceColors[0], '29', spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_LEFT), new SpaceClassic(spaceColors[1], '30', spaceSideSize, categories[1]), new SpaceChallenge(spaceColors[2], '31', spaceSideSize, categories[2]), new SpaceClassic(spaceColors[3], '32', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[4], '33', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[5], '34', spaceSideSize, categories[5]), new SpaceClassic(spaceColors[0], '35', spaceSideSize, categories[0], SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[6], '42', spaceSideSize, SpaceDisplay.CORNER_LEFT), new SpaceClassic(spaceColors[5], '41', spaceSideSize, categories[5]), new SpaceChallenge(spaceColors[4], '40', spaceSideSize, categories[4]), new SpaceClassic(spaceColors[3], '39', spaceSideSize, categories[3]), new SpaceClassic(spaceColors[2], '38', spaceSideSize, categories[2]), new SpaceClassic(spaceColors[1], '37', spaceSideSize, categories[1]), new SpacePipe('36', spaceSideSize, +3, SpaceDisplay.CORNER_BOTTOM_RIGHT),
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
