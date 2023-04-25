import { Component, OnInit } from '@angular/core';
import { Game } from "@classes/game";
import { backgroundColor, pawnColors, pawnRadius, } from "@constants/ui-constants";
import { Player } from '@classes/player';
import { Pawn } from '@classes/pawn';
import { ParamsService } from '@services/params.service';

@Component({
  selector: 'app-zim-test',
  templateUrl: './zim-test.component.html',
  styleUrls: ['./zim-test.component.scss']
})
export class ZimTestComponent implements OnInit {

  private readonly players: Player[];
  private readonly numberOfPlayers: number;
  private readonly difficulty: string;
  private readonly diceSize: number;

  constructor(private paramsService: ParamsService) {
    this.numberOfPlayers = paramsService.playersNumber;
    let players: Player[] = [];
    for (let i: number = 0; i < this.numberOfPlayers; i++) {
      players.push(new Player(paramsService.playersName[ i ], new Pawn(pawnRadius, pawnColors[ i ])));
    }
    this.players = players;
    this.difficulty = paramsService.difficulty;
    this.diceSize = paramsService.diceSize;

    new Frame({
      scaling: FULL,
      color: backgroundColor,
      outerColor: backgroundColor,
      ready: this.ready.bind(this)
    })
  }

  ngOnInit(): void {
  }

  private ready(): void {
    new Game(this.players, this.difficulty, this.diceSize);
  }
}
