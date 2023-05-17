import { images, spaceColors } from "@ui-constants/ui-constants";
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
      new Space(spaceColors[6], 'Départ', spaceSideSize, SpaceDisplay.CORNER_LEFT), new SpaceClassic(spaceColors[0], undefined, spaceSideSize, categories[0], undefined, images[0]), new SpaceClassic(spaceColors[1], undefined, spaceSideSize, categories[1], undefined, images[1]), new SpaceClassic(spaceColors[2], undefined, spaceSideSize, categories[2], undefined, images[2]), new SpaceChallenge(spaceColors[3], spaceSideSize, categories[3], undefined, images[3]), new SpaceClassic(spaceColors[4], undefined, spaceSideSize, categories[4], undefined, images[4]), new SpaceClassic(spaceColors[5], undefined, spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_RIGHT, images[5]),
      new SpaceClassic(spaceColors[5], undefined, spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_LEFT, images[12]), new SpaceClassic(spaceColors[4], undefined, spaceSideSize, categories[4], undefined, images[11]), new SpaceClassic(spaceColors[3], undefined, spaceSideSize, categories[3], undefined, images[10]), new SpaceClassic(spaceColors[2], undefined, spaceSideSize, categories[2], undefined, images[9]), new SpaceChallenge(spaceColors[1], spaceSideSize, categories[1], undefined, images[8]), new SpacePipe(undefined, spaceSideSize, +3, undefined, images[7]), new SpaceClassic(spaceColors[0], undefined, spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_RIGHT, images[6]),
      new SpacePipe(undefined, spaceSideSize, -3, SpaceDisplay.CORNER_BOTTOM_LEFT, images[13]), new SpaceChallenge(spaceColors[0], spaceSideSize, categories[0], undefined, images[14]), new SpaceClassic(spaceColors[1], undefined, spaceSideSize, categories[1], undefined, images[15]), new SpaceClassic(spaceColors[2], undefined, spaceSideSize, categories[2], undefined, images[16]), new SpaceClassic(spaceColors[3], undefined, spaceSideSize, categories[3], undefined, images[17]), new SpaceClassic(spaceColors[4], undefined, spaceSideSize, categories[4], undefined, images[18]), new SpaceClassic(spaceColors[5], undefined, spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_RIGHT, images[19]),
      new SpaceChallenge(spaceColors[5], spaceSideSize, categories[5], SpaceDisplay.CORNER_TOP_LEFT, images[26]), new SpaceClassic(spaceColors[4], undefined, spaceSideSize, categories[4], undefined, images[25]), new SpaceClassic(spaceColors[3], undefined, spaceSideSize, categories[3], undefined, images[24]), new SpaceClassic(spaceColors[2], undefined, spaceSideSize, categories[2], undefined, images[23]), new SpacePipe(undefined, spaceSideSize, +3, undefined, images[22]), new SpaceClassic(spaceColors[1], undefined, spaceSideSize, categories[1], undefined, images[21]), new SpaceClassic(spaceColors[0], undefined, spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_RIGHT, images[20]),
      new SpaceClassic(spaceColors[0], undefined, spaceSideSize, categories[0], SpaceDisplay.CORNER_BOTTOM_LEFT, images[27]), new SpaceClassic(spaceColors[1], undefined, spaceSideSize, categories[1], undefined, images[28]), new SpaceChallenge(spaceColors[2], spaceSideSize, categories[2], undefined, images[29]), new SpaceClassic(spaceColors[3], undefined, spaceSideSize, categories[3], undefined, images[30]), new SpaceClassic(spaceColors[4], undefined, spaceSideSize, categories[4], undefined, images[31]), new SpaceClassic(spaceColors[5], undefined, spaceSideSize, categories[5], undefined, images[32]), new SpaceClassic(spaceColors[0], undefined, spaceSideSize, categories[0], SpaceDisplay.CORNER_TOP_RIGHT, images[33]),
      new Space(spaceColors[7], "Arrivée", spaceSideSize, SpaceDisplay.CORNER_LEFT, images[40]), new SpaceClassic(spaceColors[5], undefined, spaceSideSize, categories[5], undefined, images[39]), new SpaceChallenge(spaceColors[4], spaceSideSize, categories[4], undefined, images[38]), new SpaceClassic(spaceColors[3], undefined, spaceSideSize, categories[3], undefined, images[37]), new SpaceClassic(spaceColors[2], undefined, spaceSideSize, categories[2], undefined, images[36]), new SpaceClassic(spaceColors[1], undefined, spaceSideSize, categories[1], undefined, images[35]), new SpacePipe(undefined, spaceSideSize, -3, SpaceDisplay.CORNER_BOTTOM_RIGHT, images[34]),
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
