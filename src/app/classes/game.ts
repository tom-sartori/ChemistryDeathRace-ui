import { Player } from "./player";
import { Board } from "./board";
import { Dice } from "./dice";
import { Pawn } from "./pawn";
import { pawnColors } from '../constant/ui-constants';
import { maxNumberOfPlayer } from '../constant/game-constants';

export class Game {

  private readonly dice: Dice;
  private readonly players: Player[];

  private currentPlayer: Player;
  private board: Board;

  constructor() {

    // Pawns.
    let pawns: Pawn[] = [];
    for (let i: number = 0; i < 4; i++) { /// TODO : current number of players.
      pawns.push(new Pawn(8, pawnColors[i]));
    }

    // Players.
    this.players = [];
    for (let i = 0; i < 4; i++) {
      this.players.push(new Player(i, "Player " + i, pawns[i]));
    }
    this.currentPlayer = this.players[0];

    // Board.
    this.board = new Board(pawns);
    this.board.center();

    // Dice.
    this.dice = new Dice();
    this.dice.pos(200, 400);

    let label = new Label({
      text:"Lancer le dé",
      size:15,
      bold:true
    });
    let button = new Button({
      label: label,
      backgroundColor: orange,
      rollBackgroundColor: green,
      width: 100,
      height: 30,
      corner:10
    });
    button.pos(175,475)
    button.addTo(this.dice);
    button.on("mousedown", this.rollDice);
  }

  private rollDice = async (): Promise<void> => {
    let result: number = this.dice.roll();
    await this.board.movePawn(this.players[this.currentPlayer.id].pawn, result);
    this.nextPlayer();
  }

  private nextPlayer(): void {
    let nextPlayerId = this.currentPlayer.id + 1;
    if (nextPlayerId >= maxNumberOfPlayer) {
      nextPlayerId = 0;
    }
    this.currentPlayer = this.players[nextPlayerId];
  }
}
