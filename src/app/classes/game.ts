import { Player } from "./player";
import { Board } from "./board";
import { Pawn } from "./pawn";
import { LeftSection } from './leftSection';
import { Observer } from '../interfaces/observer';
import { Observable } from '../interfaces/observable';
import { DiceGroup } from './diceGroup';
import { Coil } from './coil';

export class Game implements Observer {

  private readonly board: Board;
  private readonly leftSection: LeftSection;
  private readonly players: Player[];

  private _currentPlayer: Player;

  constructor(players: Player[], difficulty: string, diceSize: number) {

    // Players.
    this.players = players;
    this._currentPlayer = this.getFirstPlayer();

    // Pawns.
    let pawns: Pawn[] = [];
    for (let i = 0; i < players.length; i++) {
      pawns.push(players[i].pawn);
    }

    // Board.
    this.board = new Board(pawns);
    this.board.subscribe(this);

    // Left section.
    this.leftSection = new LeftSection(this.currentPlayer.name, diceSize);
    this.leftSection.subscribe(this);

    new Tile({
      obj: series([this.leftSection, this.board]),
      cols:2, rows:1,
      align: 'center',
      valign: 'center',
      spacingH: 70,
      clone: false
    }).center();

    let label = new Label({
      text: "⛶",
      size: 50,
      bold: true
    });
    let fullScreenButton = new Button({
      label,
      width: 50,
      backgroundColor: "rgba(0,0,0,0)",
      color: "white",
      height: 50,
    });
    fullScreenButton.tap(this.fullScreenAction);
    fullScreenButton.addTo(S)
  }

  public update(subject: Observable): void {
    if (subject instanceof DiceGroup) {
      this.movePawn(this.currentPlayer.pawn, subject.diceResult);
    }
    else if (subject instanceof Coil) {
      this.leftSection.enableDiceButton();
      this.nextPlayer();
    }
  }

  private fullScreenAction = (): void => {
    F.fullscreen(true);
  }

  private movePawn(pawn: Pawn, diceResult: number): void {
    this.leftSection.disableDiceButton();
    this.board.movePawn(pawn, diceResult);
  }

  private nextPlayer(): void {
    let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    if (currentPlayerIndex === this.players.length - 1) {
      this.currentPlayer = this.players[0];
    }
    else {
      this.currentPlayer = this.players[currentPlayerIndex + 1];
    }
  }

  private getFirstPlayer(): Player {
    return this.players[0];
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(value: Player) {
    this._currentPlayer = value;
    this.leftSection.updatePlayerName(this.currentPlayer.name);
  }
}
