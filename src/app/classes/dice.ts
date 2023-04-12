export class Dice extends Container {

  private _size!: number;
  private _currentFace!: number;

  constructor(size: number) {
    super();
    this._size = size;
    this._currentFace = 1;
    for (let i = 1; i <= size; i++) {
      let side = new Rectangle(50, 50, white);
      let text = new Label({
        text: i.toString(),
        color: black,
      });
      text.center(side);
      side.pos(0, 0)
      side.addTo(this);
      side.visible = (i === 1);
    }
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get currentFace(): number {
    return this._currentFace;
  }

  set currentFace(value: number) {
    this._currentFace = value;
  }

  public roll(): number {
    let newSide = Math.floor(Math.random() * this._size) + 1;
    this.showSide(newSide);
    return newSide;
  }

  private showSide(sideNumber: number) {
    if (sideNumber < 1 || sideNumber > this._size) return;
    this.getChildAt(this._currentFace - 1).visible = false;
    this.getChildAt(sideNumber - 1).visible = true;
    this._currentFace = sideNumber;
  }
}
