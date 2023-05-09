import { labelSizeProportion, numberOfRoll, timeBetweenRoll } from '@ui-constants/ui-constants';
import { Observable } from '@ui-observers/observable';
import { Observer } from '@ui-observers/observer';
import { ObservableSubjectDiceChanged } from '@ui-observers/observable-subject';
import { random } from 'lodash';

export class Dice extends Rectangle implements Observable {

  private readonly diceSize: number;

  private _currentFace: number;
  private label: Label;
  private observers: Observer[];

  constructor(diceSize: number) {

    const labelSize: number = W * labelSizeProportion;

    const currentFace: number = random(1, 6);

    const label: Label = new Label({
      text: currentFace.toString(),
      color: black,
      font: "Freckle Face",
      labelWidth: labelSize,
      labelHeight: labelSize,
      align: 'center',
      valign: 'center'
    })

    super(2 * labelSize, 2 * labelSize, white, undefined, undefined, 10);

    this._currentFace = currentFace;
    this.diceSize = diceSize;
    this.label = label.center(this);
    this.observers = [];
  }

  public notifyAll(): void {
    this.observers.forEach((observer: Observer) => observer.update(new ObservableSubjectDiceChanged(this.currentFace)));
  }

  public subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public roll(): void {
    this.animateDice(numberOfRoll);
  }

  get currentFace(): number {
    return this._currentFace;
  }

  private set currentFace(value: number) {
    if (0 < value && value <= this.diceSize) {
      this.label.text = value.toString();
      this._currentFace = value;
      S.update();
    }
  }

  private animateDice(numberOfRoll: number): void {
    if (numberOfRoll === 0) {
      this.notifyAll();
    }
    else {
      this.currentFace = random(1, this.diceSize);
      setTimeout(() => {
        this.animateDice(numberOfRoll - 1);
      }, timeBetweenRoll / numberOfRoll);
    }
  }
}
