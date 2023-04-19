import {GameConstants} from "../constant/game-constants";
import {UiConstants} from "../constant/ui-constants";

const random = require('lodash/random.js')

export class Dice extends Container {

  private _currentFace: number;

  constructor() {
    super();
    this._currentFace = 1;
    for (let i: number = 1; i <= GameConstants.diceSize; i++) {
      let side: Rectangle = new Rectangle(UiConstants.diceWidth, UiConstants.diceHeight, white);
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
    this.currentFace = random(1, GameConstants.diceSize);
    return this.currentFace;
  }

  private get currentFace(): number {
    return this._currentFace;
  }

  private set currentFace(value: number) {
    if (0 < value && value <= GameConstants.diceSize) {
      this.getChildAt(this.currentFace - 1).visible = false;
      this.getChildAt(value - 1).visible = true;
      this._currentFace = value;
    }
  }
}
