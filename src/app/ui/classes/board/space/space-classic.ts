import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';

export class SpaceClassic extends Space {

  public readonly category: string;

  constructor(color: GradientColor, text: string, sideSize: number, category: string, spaceDisplay?: SpaceDisplay, image?: string) {
    super(color, text, sideSize, spaceDisplay, image);

    this.category = category;
  }
}
