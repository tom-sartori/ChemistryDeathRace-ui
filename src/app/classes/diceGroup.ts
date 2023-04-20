import { Observable } from '../interfaces/observable';
import { Dice } from './dice';
import { Observer } from '../interfaces/observer';

export class DiceGroup extends Tile implements Observable {

  public diceResult: number = 1;

  private readonly dice: Dice;

  private observers: Observer[] = [];

  constructor(diceSize: number) {

    // Dice.
    const tmpDice = new Dice(diceSize);

    // Button.
    let label = new Label({
      text:"Lancer le dé",
      size:15,
      bold:true
    });
    let button = new Button({
      label: label,
      backgroundColor: orange,
      rollBackgroundColor: green,
      width: 100,
      height: 30,
      corner:10
    });
    label.addTo(button).center();

    super(
      series([tmpDice, button]), // obj
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
    button.on("mousedown", this.rollDice);

    // Set properties.
    this.dice = tmpDice;

  }

  private rollDice = async (): Promise<void> => {
    this.diceResult = this.dice.roll();
    this.notify();
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
}
