import { Label } from '@ui-components/label';
import { spaceColors } from '@constants/ui-constants';


export class Legend extends Tile {

  constructor(categories: string[]) {

    const spacing: number = 10;

    const legendItems: Label[] = categories.map((category: string, index: number) => {
      return new Label({
        text: category,
        backgroundColor: spaceColors[index],
        corner: 10,
        width: W / 3 - 5 * spacing,
        height: H / 3 - 5 * spacing,
      });

    });

    super({
      obj: series(legendItems),
      cols: 3,
      rows: 2,
      align: 'center',
      valign: 'center',
      spacingH: spacing,
      spacingV: spacing
    });
  }

}
