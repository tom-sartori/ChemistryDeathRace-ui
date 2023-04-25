import { Component, OnInit } from '@angular/core';
import { Game } from "../classes/game";
import { backgroundColor, frameHeight, frameWidth, pawnColors, pawnRadius, } from "../constant/ui-constants";
import { Player } from '../classes/player';
import { Pawn } from '../classes/pawn';
import { ParamsService } from '../services/params.service';

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  private readonly players : Player[];
  private readonly numberOfPlayers : number;
  private readonly difficulty : string;
  private readonly diceSize : number;

  constructor(private paramsService: ParamsService) {
    this.numberOfPlayers = paramsService.playersNumber;
    let tmpPlayers : Player[] = [];
    for (let i = 0; i < this.numberOfPlayers; i++) {
      tmpPlayers.push(new Player(i, paramsService.playersName[i], new Pawn(pawnRadius, pawnColors[i])));
    }
    this.players = tmpPlayers;
    this.difficulty = paramsService.difficulty;
    this.diceSize = paramsService.diceSize;
  }

  ngOnInit(): void {
    new Frame(FULL, frameWidth, frameHeight, backgroundColor, backgroundColor, this.ready.bind(this));
  }

  ready(): void {
    new Game(this.players, this.difficulty, this.diceSize);
  }
}
