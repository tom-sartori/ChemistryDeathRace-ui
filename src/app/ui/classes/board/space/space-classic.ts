import { Space } from '@classes/board/space/space';
import { SpaceDisplay } from '@classes/board/space/space-display';

export class SpaceClassic extends Space {

  public readonly category: string;

  constructor(color: GradientColor, text: string, sideSize: number, category: string, spaceDisplay?: SpaceDisplay) {
    super(color, text, sideSize, spaceDisplay);

    this.category = category;
  }
}
