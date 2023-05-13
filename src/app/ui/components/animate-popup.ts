import { font } from '@ui-constants/ui-constants';

export class AnimatePopup {

  private readonly HORIZONTAL_CENTER: number;
  private readonly VERTICAL_CENTER: number;
  private readonly label: Label;

  private ANIMATION_TIME: number = 0.5;
  private DELAY_TIME: number = 2000;
  private ENLARGEMENT_SCALE: number = 1;
  private SHRINKAGE_SCALE: number = 0;

  private ANIMATION_TYPE = {
    ENLARGEMENT: 0,
    LEFT: 1,
    RIGHT: 2,
    TOP: 3,
    BOTTOM: 4,
    ROTATION: 5,
  };

  constructor(currentPlayerName: string, currentPlayerColor: color) {

    const horizontalCenter: number = W / 2;
    const verticalCenter: number = H / 2;

    this.label = new Label({
      text: `C'est au tour de ${currentPlayerName} de jouer !`,
      labelWidth: horizontalCenter,
      labelHeight: verticalCenter,
      align: CENTER,
      backgroundColor: currentPlayerColor,
      corner: 10,
      font,
      color: white,
    });

    this.HORIZONTAL_CENTER = horizontalCenter;
    this.VERTICAL_CENTER = verticalCenter;
    this.label.addTo(S);
  }

  public makeAnimation(): void {
    const animationType = Math.floor(Math.random() * Object.getOwnPropertyNames(this.ANIMATION_TYPE).length);
    switch (animationType) {
      case this.ANIMATION_TYPE.ENLARGEMENT:
        this.animateEnlargementShrinkage();
        break;

      case this.ANIMATION_TYPE.LEFT:
        this.animateLeft();
        break;

      case this.ANIMATION_TYPE.RIGHT:
        this.animateRight();
        break;

      case this.ANIMATION_TYPE.TOP:
        this.animateTop();
        break;

      case this.ANIMATION_TYPE.BOTTOM:
        this.animateBottom();
        break;

      case this.ANIMATION_TYPE.ROTATION:
        this.animateRotation();
        break;
    }
  }


  private animateEnlargementShrinkage(): void {
    this.label.center().sca(this.SHRINKAGE_SCALE);

    this.label.animate({
      props: {scale: this.ENLARGEMENT_SCALE},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {scale: this.SHRINKAGE_SCALE},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }

  private animateLeft(): void {
    const halfX = this.HORIZONTAL_CENTER / 2;
    const halfY = this.VERTICAL_CENTER / 2;

    this.label.pos(-6 * halfX, halfY);

    this.label.animate({
      props: {x: 2 * halfX},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {x: -6 * halfX},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }

  private animateRight(): void {
    const halfX = this.HORIZONTAL_CENTER / 2;
    const halfY = this.VERTICAL_CENTER / 2;

    this.label.pos(6 * halfX, halfY);

    this.label.animate({
      props: {x: 2 * halfX},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {x: 6 * halfX},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }

  private animateTop(): void {
    const halfX = this.HORIZONTAL_CENTER / 2;
    const halfY = this.VERTICAL_CENTER / 2;
    this.label.pos(halfX, -6 * halfY);

    this.label.animate({
      props: {y: halfY},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {y: -6 * halfY},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }

  private animateBottom(): void {
    const halfX = this.HORIZONTAL_CENTER / 2;
    const halfY = this.VERTICAL_CENTER / 2;

    this.label.pos(halfX, 6 * halfY);

    this.label.animate({
      props: {y: halfY},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {y: 6 * halfY},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }

  private animateRotation(): void {
    this.label.center();
    this.label.sca(0);

    this.label.animate({
      props: {rotation: 360, scale: 1},
      time: this.ANIMATION_TIME,
    });

    setTimeout(() => {
      this.label.animate({
        props: {rotation: 0, scale: 0},
        time: this.ANIMATION_TIME,
      });
    }, this.DELAY_TIME);
  }
}
