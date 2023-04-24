import { Component, OnInit } from '@angular/core';
import { Game } from "../classes/game";

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  constructor() {
    new Frame(FULL, undefined, undefined, grey, grey, this.ready);
  }

  ngOnInit(): void {
  }

  private ready(): void {
    new Game();
  }
}
