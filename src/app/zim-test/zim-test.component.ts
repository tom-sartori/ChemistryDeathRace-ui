import {Component, OnInit} from '@angular/core';
import {Game} from "../classes/game";

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  private _game!: Game;

  constructor() { }

  ngOnInit(): void {
    new Frame(FILL, 1000, 1000, grey, grey, this.ready.bind(this));
  }

  ready() {
    this._game = new Game(1000, 1000, 4);
  }

}
