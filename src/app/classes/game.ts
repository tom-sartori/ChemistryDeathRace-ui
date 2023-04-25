import { Player } from "@classes/player";
import { Board } from "@classes/board";
import { Pawn } from "@classes/pawn";
import { LeftSection } from '@classes/leftSection';
import { Observer } from '@interfaces/observer';
import { Observable } from '@interfaces/observable';
import { Coil } from '@classes/coil';
import {
  boardWidthProportion,
  framePaddingProportion,
  pawnColors,
  pawnDiameterProportion,
  spaceMargin
} from '@constants/ui-constants';
import { boardCols, boardRows } from '@constants/game-constants';
import { Dice } from '@classes/dice';

export class Game implements Observer {

  private readonly board: Board;
  private readonly leftSection: LeftSection;
  private readonly players: Player[];

  private _currentPlayer: Player;

  constructor(playerNames: string[], difficulty: string, diceSize: number) {
    // W < H ? Portrait : Landscape.
    const cols: number = W < H ? 1 : 2;
    const rows: number = W < H ? 2 : 1;
    const boardWidth: number = W < H ? W - (W * framePaddingProportion * 2) : W * boardWidthProportion;
    let boardHeight: number = H - ((boardRows - 1) * spaceMargin);
    boardHeight = boardHeight - (boardHeight * framePaddingProportion * 2);

    const spaceSideSize: number = Math.floor(Math.min(boardWidth / boardCols, boardHeight / boardRows))
    const pawnRadius: number = Math.floor((spaceSideSize * pawnDiameterProportion) / 2);
    // Players.
    this.players = [];
    const pawns: Pawn[] = [];
    playerNames.forEach((playerName: string, index: number): void => {
      const pawn: Pawn = new Pawn(pawnRadius, pawnColors[ index ]);
      pawns.push(pawn);
      this.players.push(new Player(playerName, pawn));
    })
    this._currentPlayer = this.getFirstPlayer();

    // Board.
    this.board = new Board(spaceSideSize, pawns);
    this.board.subscribe(this);

    // Left section.
    this.leftSection = new LeftSection(this.currentPlayer.name, diceSize);
    this.leftSection.subscribe(this);

    new Tile({
      obj: series([this.leftSection, this.board]),
      cols, rows,
      align: 'center',
      valign: 'center',
      spacingH: 70,
      spacingV: 40,
      clone: false
    }).center();

    const label: Label = new Label({
      text: "⛶",
      size: 50,
    });
    const fullScreenButton: Button = new Button({
      label,
      width: 50,
      backgroundColor: "rgba(0,0,0,0)",
      color: "white",
      height: 50,
    });
    fullScreenButton.tap(() => F.fullscreen(true));
    fullScreenButton.addTo(S)
  }

  public update(subject: Observable): void {
    if (subject instanceof Dice) {
      this.movePawn(this.currentPlayer.pawn, subject.currentFace);
    }
    else if (subject instanceof Coil) {
      this.leftSection.enableDiceButton();
      this.nextPlayer();
    }
  }

  private movePawn(pawn: Pawn, diceResult: number): void {
    this.leftSection.disableDiceButton();
    this.board.movePawn(pawn, diceResult);
  }

  private nextPlayer(): void {
    let currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    if (currentPlayerIndex === this.players.length - 1) {
      this.currentPlayer = this.players[ 0 ];
    }
    else {
      this.currentPlayer = this.players[ currentPlayerIndex + 1 ];
    }
  }

  private getFirstPlayer(): Player {
    return this.players[ 0 ];
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(value: Player) {
    this._currentPlayer = value;
    this.leftSection.updatePlayerName(this.currentPlayer.name);
  }
}
