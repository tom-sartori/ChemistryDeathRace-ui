import {Component, OnInit} from '@angular/core';
import {Game} from "../classes/game";
import {UiConstants} from "../constant/ui-constants";

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Frame(FILL, 1000, 1000, grey, grey, this.ready.bind(this));
  }

  ready(): void {
    new Game(UiConstants.gameWidth, UiConstants.gameHeight);
  }
}
