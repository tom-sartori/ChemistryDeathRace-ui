export class Square {
  private color: string = 'red';
  private x = 0;
  private y = 0;
  private z = 30;

  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x * this.z, this.y * this.z, this.z, this.z);
  }

  moveRight() {
    this.x++;
    this.draw();
  }

  // draw(x: number, y: number, z: number) {
  //   this.ctx.fillRect(z * x, z * y, z, z);
  // }



  // move(y: number, z: number) {
  //   const max = this.ctx.canvas.width / z;
  //   const canvas = this.ctx.canvas;
  //   let x = 0;
  //   const i = setInterval(() => {
  //     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     this.draw(x, y, z);
  //     x++;
  //     if (x >= max) {
  //       clearInterval(i);
  //     }
  //   }, 200);
  // }
}
