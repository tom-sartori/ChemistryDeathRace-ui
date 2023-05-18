import { Space } from '@ui-classes/board/space/space';
import { SpaceDisplay } from '@ui-classes/board/space/space-display';
import { pipeBackgroundColor } from '@ui-constants/ui-constants';

export class SpacePipe extends Space {

  public readonly length: number;

  constructor(sideSize: number, length: number, image: string, spaceDisplay?: SpaceDisplay) {
    super(pipeBackgroundColor, undefined, sideSize, image, spaceDisplay);

    this.length = length;
  }
}
