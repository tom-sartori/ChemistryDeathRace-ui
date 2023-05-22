import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';

export class SpaceClassic extends Space {

  public readonly category: string;

  constructor(color: GradientColor, sideSize: number, category: string, image: string, spaceDisplay?: SpaceDisplay) {
    super(color, undefined, sideSize, image, spaceDisplay);

    this.category = category;
  }
}
