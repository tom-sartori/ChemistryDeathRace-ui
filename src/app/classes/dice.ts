import { diceHeight, diceWidth, numberOfRoll, timeBetweenRoll } from '@constants/ui-constants';
import { Observable } from '@interfaces/observable';
import { Observer } from '@interfaces/observer';
import { ObservableSubjectDiceChanged } from '@classes/ObservableSubject';

const random = require('lodash/random.js')

export class Dice extends Rectangle implements Observable {

  private readonly diceSize: number;

  private _currentFace: number;
  private label: Label;
  private observers: Observer[];

  constructor(diceSize: number) {
    super(diceWidth, diceHeight, white, undefined, undefined, 10);

    this._currentFace = 1;
    this.diceSize = diceSize;
    this.label = new Label({
      text: this.currentFace.toString(),
      color: black,
      size: diceWidth - diceWidth / 2,
      font: "Freckle Face",
      labelWidth: diceWidth,
      align: 'center',
    }).center(this);
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
