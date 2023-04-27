import { Observer } from '@interfaces/observer';
import { Dice } from '@classes/dice';
import { labelSizeProportion } from '@constants/ui-constants';

export class DiceGroup extends Tile {

  public diceResult: number;

  private readonly dice: Dice;

  private rollButton: Button;

  constructor(diceSize: number) {

    // Dice.
    const dice: Dice = new Dice(diceSize);

    // Button.
    let label: Label = new Label({
      text: "Lancer le dé",
      size: W * labelSizeProportion,
      bold: true,
      font: "Freckle Face"
    });
    let rollButton: Button = new Button({
      label,
      backgroundColor: orange,
      rollBackgroundColor: green,
      width: label.width + 20,
      height: label.height + 20,
      corner: 10
    });

    super(
      series([dice, rollButton]), // obj
      1, 2,                             // cols, rows
      undefined, H * labelSizeProportion, // spacingH, spacingV
      undefined,                        // unique
      undefined, undefined,             // width, height
      undefined, undefined,             // squeezeH, squeezeV
      undefined, undefined,             // colSize, rowSize
      'center', undefined,              // align, valign
      undefined,                        // count
      undefined, undefined, undefined,  // mirrorH, mirrorV, snapToPixel
      false                             // clone
    );

    // Button event.
    rollButton.tap(this.rollDice);

    // Set properties.
    this.dice = dice;
    this.diceResult = 1;
    this.rollButton = rollButton;
  }

  private rollDice = (): void => {
    this.disableRollButton();
    this.dice.roll();
  }

  public subscribe(observer: Observer): void {
    this.dice.subscribe(observer);
  }

  private disableRollButton(): void {
    this.rollButton.enabled = false;
  }

  public enableRollButton(): void {
    this.rollButton.enabled = true;
  }
}
