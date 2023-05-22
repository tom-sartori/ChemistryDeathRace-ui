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
      new Space(spaceColors[6], 'Départ', spaceSideSize, undefined, SpaceDisplay.CORNER_LEFT), new SpaceClassic(spaceColors[0], spaceSideSize, categories[0], images[0]), new SpaceClassic(spaceColors[1], spaceSideSize, categories[1], images[1]), new SpaceClassic(spaceColors[2], spaceSideSize, categories[2], images[2]), new SpaceChallenge(spaceColors[3], spaceSideSize, categories[3], images[3]), new SpaceClassic(spaceColors[4], spaceSideSize, categories[4], images[4]), new SpaceClassic(spaceColors[5], spaceSideSize, categories[5], images[5], SpaceDisplay.CORNER_TOP_RIGHT),
      new SpaceClassic(spaceColors[5], spaceSideSize, categories[5], images[12], SpaceDisplay.CORNER_TOP_LEFT), new SpaceClassic(spaceColors[4], spaceSideSize, categories[4], images[11]), new SpaceClassic(spaceColors[3], spaceSideSize, categories[3], images[10]), new SpaceClassic(spaceColors[2], spaceSideSize, categories[2], images[9]), new SpaceChallenge(spaceColors[1], spaceSideSize, categories[1], images[8]), new SpacePipe(spaceSideSize, +3, images[7]), new SpaceClassic(spaceColors[0], spaceSideSize, categories[0], images[6], SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new SpacePipe(spaceSideSize, -3, images[13], SpaceDisplay.CORNER_BOTTOM_LEFT), new SpaceChallenge(spaceColors[0], spaceSideSize, categories[0], images[14]), new SpaceClassic(spaceColors[1], spaceSideSize, categories[1], images[15]), new SpaceClassic(spaceColors[2], spaceSideSize, categories[2], images[16]), new SpaceClassic(spaceColors[3], spaceSideSize, categories[3], images[17]), new SpaceClassic(spaceColors[4], spaceSideSize, categories[4], images[18]), new SpaceClassic(spaceColors[5], spaceSideSize, categories[5], images[19], SpaceDisplay.CORNER_TOP_RIGHT),
      new SpaceChallenge(spaceColors[5], spaceSideSize, categories[5], images[26], SpaceDisplay.CORNER_TOP_LEFT), new SpaceClassic(spaceColors[4], spaceSideSize, categories[4], images[25]), new SpaceClassic(spaceColors[3], spaceSideSize, categories[3], images[24]), new SpaceClassic(spaceColors[2], spaceSideSize, categories[2], images[23]), new SpacePipe(spaceSideSize, +3, images[22]), new SpaceClassic(spaceColors[1], spaceSideSize, categories[1], images[21]), new SpaceClassic(spaceColors[0], spaceSideSize, categories[0], images[20], SpaceDisplay.CORNER_BOTTOM_RIGHT),
      new SpaceClassic(spaceColors[0], spaceSideSize, categories[0], images[27], SpaceDisplay.CORNER_BOTTOM_LEFT), new SpaceClassic(spaceColors[1], spaceSideSize, categories[1], images[28]), new SpaceChallenge(spaceColors[2], spaceSideSize, categories[2], images[29]), new SpaceClassic(spaceColors[3], spaceSideSize, categories[3], images[30]), new SpaceClassic(spaceColors[4], spaceSideSize, categories[4], images[31]), new SpaceClassic(spaceColors[5], spaceSideSize, categories[5], images[32]), new SpaceClassic(spaceColors[0], spaceSideSize, categories[0], images[33], SpaceDisplay.CORNER_TOP_RIGHT),
      new Space(spaceColors[7], "Arrivée", spaceSideSize, images[40], SpaceDisplay.CORNER_LEFT), new SpaceClassic(spaceColors[5], spaceSideSize, categories[5], images[39]), new SpaceChallenge(spaceColors[4], spaceSideSize, categories[4], images[38]), new SpaceClassic(spaceColors[3], spaceSideSize, categories[3], images[37]), new SpaceClassic(spaceColors[2], spaceSideSize, categories[2], images[36]), new SpaceClassic(spaceColors[1], spaceSideSize, categories[1], images[35]), new SpacePipe(spaceSideSize, -3, images[34], SpaceDisplay.CORNER_BOTTOM_RIGHT),
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
