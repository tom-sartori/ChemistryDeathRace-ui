import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';
import { pipeBackgroundColor } from '@ui-constants/ui-constants';
import { Label } from '@ui-components/label';

export class SpacePipe extends Space {

  public readonly length: number;

  constructor(text: string, sideSize: number, length: number, spaceDisplay?: SpaceDisplay) {
    super(pipeBackgroundColor, text, sideSize, spaceDisplay, length > 0 ? 'pipe-plus.png' : 'pipe-minus.png');

    this.length = length;

    new Label({
      text: `Tunnel ${length}`, /// TODO : toString.
      color: black,
      size: 15
    }).center(this)
      .mov(0, this.height / 2 - 15);
  }
}
