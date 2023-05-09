import { font, labelMaxSize, labelPadding, labelSizeProportion } from '@constants/ui-constants';

export class Label extends zim.Label {

  constructor(config: {
    text: string,
    color?: GradientColor,
    width?: number,
    height?: number,
    backgroundColor?: GradientColor,
    corner?: number,
  }) {

    super({
      text: config.text,
      size: W * labelSizeProportion,
      font,
      color: config.color ?? white,
      align: CENTER,
      valign: CENTER,
      padding: labelPadding,
      backgroundColor: config.backgroundColor ?? "#0000",
      labelWidth: config.width,
      labelHeight: config.height,
      maxSize: labelMaxSize,
      corner: config.corner ?? 0,
    });
  }
}
