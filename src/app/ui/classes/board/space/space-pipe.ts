import { Space } from '@classes/board/space/space';
import { SpaceDisplay } from '@classes/board/space/space-display';
import { pipeBackgroundColor } from '@constants/ui-constants';
import { Label } from '@ui-components/label';

export class SpacePipe extends Space {

  public readonly length: number;

  constructor(text: string, sideSize: number, length: number, spaceDisplay?: SpaceDisplay) {
    super(pipeBackgroundColor, text, sideSize, spaceDisplay);

    this.length = length;

    new Label({
      text: `Tunnel ${length}`, /// TODO : toString.
      color: black,
      size: 15
    }).center(this)
      .mov(0, 0 / 2 - 15);
  }
}
