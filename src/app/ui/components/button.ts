import { Label } from '@ui-components/label';
import { buttonCorner, buttonPadding } from '@ui-constants/ui-constants';

export class Button extends zim.Button {

  /// TODO : Enum button type ?
  constructor(config: {
    text: string,
    backgroundColor?: GradientColor,
    rollBackgroundColor?: GradientColor,
    width?: number,
    height?: number,
    textColor?: GradientColor,
  }) {
    const label: Label = new Label({
      text: config.text,
      color: config.textColor,
      width: config.width,
      height: config.height
    });

    super({
      label,
      backgroundColor: config.backgroundColor,
      rollBackgroundColor: config.rollBackgroundColor,
      width: config.width ?? label.width + buttonPadding,
      height: config.height ?? label.height + buttonPadding,
      corner: buttonCorner,
    });
  }
}
