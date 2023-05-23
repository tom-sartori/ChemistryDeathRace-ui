import { font, labelMaxSize, labelPadding, labelSizeProportion } from '@ui-constants/ui-constants';

export class Label extends zim.Label {

  constructor(config: {
    text: string,
    size?: number,
    color?: GradientColor,
    width?: number,
    height?: number,
    backgroundColor?: GradientColor,
    corner?: number,
  }) {

    super({
      text: config.text,
      size: config.size ?? W * labelSizeProportion,
      font,
      color: config.color ?? white,
      align: CENTER,
      valign: CENTER,
      padding: labelPadding,
      backgroundColor: config.backgroundColor ?? "#0000",
      lineWidth: config.width,
      labelHeight: config.height,
      maxSize: labelMaxSize,
      corner: config.corner ?? 0,
      // bold: true
    });
  }
}
