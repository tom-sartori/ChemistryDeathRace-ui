import { font, labelMaxSize, labelPadding, labelSizeProportion } from '@constants/ui-constants';

export class Label extends zim.Label {

  constructor(config: {
    text: string,
    size?: number,
    color?: GradientColor,
    width?: number,
    height?: number
  }) {

    super({
      text: config.text,
      size: config.size ?? W * labelSizeProportion,
      font,
      color: config.color ?? white,
      align: CENTER,
      valign: CENTER,
      padding: labelPadding,
      backgroundColor: "#0000",
      labelWidth: config.width,
      labelHeight: config.height,
      maxSize: labelMaxSize,
    });
  }
}
