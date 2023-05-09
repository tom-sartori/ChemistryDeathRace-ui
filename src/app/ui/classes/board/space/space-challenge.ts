import { Space } from '@classes/board/space/space';
import { SpaceDisplay } from '@classes/board/space/space-display';
import { Label } from '@ui-components/label';

export class SpaceChallenge extends Space {

  public readonly category: string;

  constructor(color: GradientColor, text: string, sideSize: number, category: string, spaceDisplay?: SpaceDisplay) {
    super(color, text, sideSize, spaceDisplay);

    this.category = category;

    new Label({
      text: 'Défi',
      color: black,
      size: 15
    }).center(this)
      .mov(0, 0 / 2 - 15);
  }
}
