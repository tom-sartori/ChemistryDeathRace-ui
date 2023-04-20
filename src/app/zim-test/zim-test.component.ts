import { Component, OnInit } from '@angular/core';
import { Game } from "../classes/game";
import { frameHeight, frameWidth, } from "../constant/ui-constants";
import {StageService} from "../services/stage.service";

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  frame!: Frame;
  stageService : StageService = StageService.getInstance()

  constructor() { }

  ngOnInit(): void {
    this.frame = new Frame(FILL, frameWidth, frameHeight, grey, grey, this.ready.bind(this));
  }

  ready(): void {
    this.stageService.stage = this.frame.stage.stage;
    new Game();
  }
}
