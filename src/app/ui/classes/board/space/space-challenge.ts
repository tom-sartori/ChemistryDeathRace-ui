import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';

export class SpaceChallenge extends Space {

  public readonly category: string;

  constructor(color: GradientColor, sideSize: number, category: string, spaceDisplay?: SpaceDisplay, image?: string) {
    super(color, "Défi", sideSize, spaceDisplay, image);

    this.category = category;

    // new Label({
    //   text: 'Défi',
    //   color: black,
    //   size: 15
    // }).center(this)
    //   .mov(0, 0 / 2 - 15);
  }
}
