import { Injectable } from '@angular/core';
import { defaultDiceSize, defaultNumberOfPlayer } from '@constants/game-constants';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  public playersNumber: number;
  public playerNames: string[];
  public diceSize: number;
  public difficulty: string;

  constructor() {
    this.playerNames = [];
    this.playersNumber = defaultNumberOfPlayer;
    this.diceSize = defaultDiceSize;
    this.difficulty = '';
  }
}
