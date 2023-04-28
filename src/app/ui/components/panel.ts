import { framePadding, panelMargin, } from '@constants/ui-constants';
import { Label } from '@ui-components/label';
import { Button } from '@ui-components/button';

export abstract class Panel extends zim.Panel {

  protected constructor(config: {
    titleBar: string,
    header?: string,
    message?: string,
    buttons?: { text: string, function: Function }[],
    backgroundColor?: GradientColor
  }) {
    const width: number = W - (framePadding * 2);
    const height: number = H - (framePadding * 2);

    const tileWidth: number = width;
    const tileHeight: number = height / 2;

    const labelWidth: number = tileWidth;
    let labelHeight: number = (config.buttons?.length ?? 0) + (config.message ? 1 : 0);
    labelHeight = tileHeight / (labelHeight === 0 ? 1 : labelHeight);

    const header: Label | undefined = config.header ?
      new Label({text: config.header, width: width, height: height / 4}) : undefined;

    const content: (Button | Label)[] = [];

    if (config.message) {
      content.push(new Label({text: config.message, width: labelWidth, height: labelHeight}));
    }

    config.buttons?.forEach(button => {
      content.push(new Button({
          text: button.text,
          width: labelWidth,
          height: labelHeight
        }).tap(button.function)
      )
    });

    const display: Tile = new Tile({
      width: tileWidth,
      height: tileHeight,
      spacingV: 10,
      cols: 1,
      rows: content.length,
      obj: series(content),
      align: 'center',
      squeezeH: true,
      clone: false
    });

    super({
      width, height,
      titleBar: config.titleBar,
      backgroundColor: config.backgroundColor,
      draggable: false,
      boundary: new Boundary(0, 0, W, H).contract(panelMargin, panelMargin, width + panelMargin, height + panelMargin),
      content: {
        header,
        display,
      }
    });
  }

  public switchTo = (panel?: Panel): void => {
    if (panel) {
      panel.center();
    }
    this.removeFrom(S);
    S.update();
  }
}