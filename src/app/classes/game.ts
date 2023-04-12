import {Player} from "./player";
import {Board} from "./board";
import {Dice} from "./dice";
import {Pawn} from "./pawn";

export class Game extends Container {

  private _players: Player[] = [];
  private _numberMaxPlayers: number;
  private _currentPlayer: Player;
  private _board: Board;

  private _dice!: Dice;

  constructor(width: number, height : number, numberMaxPlayers: number) {
    super(width, height);

    // Création des pions
    const pawnColors = ["#9d0000", "#76009d", "#229d00", "#00259d"];
    let pawns: Pawn[] = [];
    for (let i = 0; i < 4; i++) {
      pawns.push(new Pawn(i+1, 8, pawnColors[i]));
    }

    // Création des joueurs
    this._players = [];
    for (let i = 0; i < 4; i++) {
      this._players.push(new Player(i, "Player " + i, pawns[i]));
    }
    this._numberMaxPlayers = numberMaxPlayers;
    this._currentPlayer = this.players[0];

    // Création du plateau
    this._board = new Board(pawns);
    this._board.center();

    // Création du dé
    this._dice = new Dice(6);
    this._dice.pos(200, 400);

    let label = new Label({
      text:"Lancer le dé",
      size:15,
      bold:true
    });
    let button = new Button({
      label: label,
      backgroundColor:"orange",
      rollBackgroundColor:"green",
      width: 100,
      height: 30,
      corner:10
    });
    button.pos(175,475)
    button.addTo(this._dice);
    button.on("mousedown", this.rollDice);
  }

  private rollDice = () => {
    let result = this._dice.roll();
    this._board.movePawn(this._currentPlayer.playerId, result);
    this.nextPlayer();
  }

  private nextPlayer() {
    let nextPlayerId = this._currentPlayer.playerId + 1;
    if (nextPlayerId >= this._numberMaxPlayers) {
      nextPlayerId = 0;
    }
    this._currentPlayer = this._players[nextPlayerId];
  }

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  get numberMaxPlayers(): number {
    return this._numberMaxPlayers;
  }

  set numberMaxPlayers(value: number) {
    this._numberMaxPlayers = value;
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(value: Player) {
    this._currentPlayer = value;
  }

  get board(): Board {
    return this._board;
  }

  set board(value: Board) {
    this._board = value;
  }
}
