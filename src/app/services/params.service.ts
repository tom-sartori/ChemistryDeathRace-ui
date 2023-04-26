import { Injectable } from '@angular/core';
import { defaultDiceSize, defaultNumberOfPlayer } from '@constants/game-constants';
import { Question } from '@models/question/question.model';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  public playersNumber: number;
  public playerNames: string[];
  public diceSize: number;
  public difficulty: string;
  public questions: Question[];

  constructor() {
    this.playerNames = [];
    this.playersNumber = defaultNumberOfPlayer;
    this.diceSize = defaultDiceSize;
    this.difficulty = '';
    this.questions = [];
  }
}
