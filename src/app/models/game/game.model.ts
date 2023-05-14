import { Answer } from '@models/game/answer.model';

export class Game {

  constructor(
    public id: string,
    public difficulty: string,
    public numberOfPlayers: number,
    public diceSize: number,
    public startDate?: Date,
    public endDate?: Date,
    public answers?: Answer[],
  ) {
  }
}
