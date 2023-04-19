import { diceHeight, diceWidth } from '../constant/ui-constants';
import { diceSize } from '../constant/game-constants';

const random = require('lodash/random.js')

export class Dice extends Container {

  private _currentFace: number;

  constructor() {
    super();
    this._currentFace = 1;
    for (let i: number = 1; i <= diceSize; i++) {
      let side: Rectangle = new Rectangle(diceWidth, diceHeight, white);
      let text: Label = new Label({
        text: i.toString(),
        color: black,
      });
      text.center(side);
      side.pos(0, 0)
      side.addTo(this);
      side.visible = (i === 1);
    }
  }

  public roll(): number {
    this.currentFace = random(1, diceSize);
    return this.currentFace;
  }

  private get currentFace(): number {
    return this._currentFace;
  }

  private set currentFace(value: number) {
    if (0 < value && value <= diceSize) {
      this.getChildAt(this.currentFace - 1).visible = false;
      this.getChildAt(value - 1).visible = true;
      this._currentFace = value;
    }
  }
}
