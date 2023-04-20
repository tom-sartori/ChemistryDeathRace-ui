import { Component, OnInit } from '@angular/core';
import { Game } from "../classes/game";
import { frameHeight, frameWidth, pawnColors, pawnRadius, } from "../constant/ui-constants";
import { Player } from '../classes/player';
import { Pawn } from '../classes/pawn';

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

  constructor() {
    /// TODO: Get these information from the user
    this.numberOfPlayers = 4;
    this.players = [];
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.players.push(new Player(i, "Player " + i, new Pawn(pawnRadius, pawnColors[i])));
    }
    this.difficulty = "S7";
    this.diceSize = 6;
  }

  ngOnInit(): void {
    new Frame(FILL, frameWidth, frameHeight, grey, grey, this.ready.bind(this));
  }

  ready(): void {
    new Game(this.players, this.difficulty, this.diceSize);
  }
}
