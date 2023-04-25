import { Observable } from '../interfaces/observable';
import { Dice } from './dice';
import { Observer } from '../interfaces/observer';

export class DiceGroup extends Tile implements Observable {

  public diceResult: number;

  private readonly dice: Dice;
  private readonly observers: Observer[];

  private rollButton: Button;

  constructor(diceSize: number) {

    // Dice.
    const dice = new Dice(diceSize);

    // Button.
    let label = new Label({
      text: "Lancer le dé",
      size: 15,
      bold: true
    });
    let rollButton = new Button({
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
    this.observers = [];
  }

  private rollDice = (): void => {
    this.diceResult = this.dice.roll();
    this.notifyAll();
  }

  public notifyAll(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public disableRollButton() {
    this.rollButton.enabled = false;
  }

  public enableRollButton() {
    this.rollButton.enabled = true;
  }
}
