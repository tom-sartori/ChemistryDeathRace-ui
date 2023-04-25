import { Observer } from '@interfaces/observer';
import { Dice } from '@classes/dice';

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
      size: 15,
      bold: true
    });
    let rollButton: Button = new Button({
      label,
      backgroundColor: orange,
      rollBackgroundColor: green,
      width: 100,
      height: 30,
      corner: 10
    });

    super(
      series([dice, rollButton]), // obj
      1, 2,                             // cols, rows
      undefined, 10,                    // spacingH, spacingV
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
    this.dice.roll();
    // this.notifyAll();
  }

  public subscribe(observer: Observer): void {
    this.dice.subscribe(observer);
  }

  public disableRollButton(): void {
    this.rollButton.enabled = false;
  }

  public enableRollButton(): void {
    this.rollButton.enabled = true;
  }
}
