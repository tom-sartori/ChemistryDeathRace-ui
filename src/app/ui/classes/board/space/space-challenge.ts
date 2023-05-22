import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';

export class SpaceChallenge extends Space {

  public readonly category: string;

  constructor(color: GradientColor, sideSize: number, category: string, image: string, spaceDisplay?: SpaceDisplay) {
    super(color, "Défi", sideSize, image, spaceDisplay);

    this.category = category;
  }
}
