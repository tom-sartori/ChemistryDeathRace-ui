import { Component, OnInit } from '@angular/core';
import { Game } from "@classes/game";
import { backgroundColor, } from "@constants/ui-constants";
import { ParamsService } from '@services/params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  constructor(
    private paramsService: ParamsService,
    private router: Router
  ) {

    if (this.router.url === '/game-test') {
      new Frame({
        scaling: FULL,
        color: backgroundColor,
        outerColor: backgroundColor,
        ready: (): void => {
          new Game(['Jean', 'Michel', 'Denis', 'Henry'], 'S7', 6);
        }
      });
    }
    else {
      new Frame({
        scaling: FULL,
        color: backgroundColor,
        outerColor: backgroundColor,
        ready: (): void => {
          new Game(paramsService.playerNames, paramsService.difficulty, paramsService.diceSize);
        }
      });
    }
  }

  ngOnInit(): void {
  }
}
