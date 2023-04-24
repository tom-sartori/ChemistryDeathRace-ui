import { Player } from "./player";
import { Board } from "./board";
import { Pawn } from "./pawn";
import { LeftSection } from './leftSection';
import { Observer } from '../interfaces/observer';
import { Observable } from '../interfaces/observable';
import { DiceGroup } from './diceGroup';

export class Game implements Observer {

  private readonly board: Board;
  private readonly players: Player[];

  private _currentPlayer: Player;
  private leftSection: LeftSection;
  private fullScreenButton: Button;

  constructor(players: Player[], difficulty: string, diceSize: number) {

    // Players.
    this.players = players;
    this._currentPlayer = this.players[0];

    // Pawns.
    let pawns: Pawn[] = [];
    for (let i = 0; i < players.length; i++) {
      pawns.push(players[i].pawn);
    }

    // Board.
    this.board = new Board(pawns);

    // Left section.
    this.leftSection = new LeftSection(this.currentPlayer.name, diceSize);
    this.leftSection.diceGroup.subscribe(this);

    new Tile({
      obj: series([this.leftSection, this.board]),
      cols:2, rows:1,
      align: 'center',
      valign: 'center',
      spacingH:70,
      clone: false
    }).center();

    let label = new Label({
      text:"⛶",
      size:50,
      bold:true
    });
    this.fullScreenButton = new Button({
      label: label,
      width: 50,
      backgroundColor: "rgba(0,0,0,0)",
      color: "white",
      height: 50,
    });
    label.addTo(this.fullScreenButton).center();
    this.fullScreenButton.on("mousedown", this.fullScreenAction);
    this.fullScreenButton.addTo(S)
  }

  update(subject: Observable): void {
    if (subject instanceof DiceGroup) {
      this.movePawn(this.currentPlayer.pawn, subject.diceResult);
    }
  }

  private fullScreenAction = (): void => {
    F.fullscreen(true);
  }

  private async movePawn(pawn: Pawn, diceResult: number) {
    await this.board.movePawn(pawn, diceResult);
    this.nextPlayer();
  }

  private nextPlayer(): void {
    let nextPlayerId = this.currentPlayer.id + 1;
    if (nextPlayerId >= this.players.length) {
      nextPlayerId = 0;
    }
    this.currentPlayer = this.players[nextPlayerId];
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(value: Player) {
    this._currentPlayer = value;
    this.leftSection.updatePlayerName(this.currentPlayer.name);
  }
}
