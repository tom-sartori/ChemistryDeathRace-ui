import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Square} from "../class/square";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private requestId!: number;
  private interval!: number;
  private squares: Square[] = [];

  constructor(private ngZone: NgZone) { }

  // ngOnInit(): void {
  //   this.ctx = this.canvas.nativeElement.getContext('2d')!;
  //   this.moveSquares();
  // }
  //
  // animate(): void {
  //   // this.ctx.fillStyle = 'red';
  //   // square.draw(5, 1, 20);
  //   // square.move(1, 30);
  //
  //   this.squares.push(square);
  //   // this.moveSquares();
  //
  //   const id = requestAnimationFrame(this.animate);
  // }
  //
  // moveSquares() {
  //   const canvas = this.ctx.canvas;
  //
  //   setInterval(() => {
  //     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     this.squares.forEach((square: Square) => {
  //       square.moveRight();
  //     });
  //   }, 200);
  // }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => this.tick(), 200);
  }

  private tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  public play() {
    const square: Square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId)
  }
}
