import { Player } from "@classes/player";
import { Board } from "@classes/board";
import { Pawn } from "@classes/pawn";
import { LeftSection } from '@classes/leftSection';
import { Observer } from '@interfaces/observer';
import {
  boardWidthProportion,
  framePaddingProportion,
  pawnColors,
  pawnDiameterProportion,
  spaceMargin
} from '@constants/ui-constants';
import { boardCols, boardRows } from '@constants/game-constants';
import { QuestionPanelShowQuestion } from '@classes/question-panel-show-question';
import { Question } from '@models/question/question.model';
import { ObservableSubject, ObservableSubjectKind } from '@classes/ObservableSubject';
import { EndOfGame } from '@classes/end-of-game';

export class Game implements Observer {

  private readonly board: Board;
  private readonly leftSection: LeftSection;
  private readonly players: Player[];

  private _currentPlayer: Player;
  private questions: Question[];

  constructor(playerNames: string[], questions: Question[], diceSize: number) {
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
      const pawn: Pawn = new Pawn(pawnRadius, pawnColors[index]);
      pawns.push(pawn);
      this.players.push(new Player(playerName, pawn));
    })
    this._currentPlayer = this.getFirstPlayer();

    // Questions.
    this.questions = questions;

    // Board.
    this.board = new Board(spaceSideSize, pawns, this.getCategories());
    this.board.subscribe(this);

    // Left section.
    this.leftSection = new LeftSection(this.currentPlayer, diceSize);
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

    // Fullscreen button.
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
    fullScreenButton.addTo(S);
  }

  public update(observableSubject: ObservableSubject): void {
    switch (observableSubject.kind) {
      case ObservableSubjectKind.diceChanged:
        this.onDiceChanged(observableSubject.diceValue)
        break;
      case ObservableSubjectKind.PawnMoved:
        this.onPawnMoved(observableSubject.category);
        break;
      case ObservableSubjectKind.PlayerAnswered:
        this.onPlayerAnswered(observableSubject.isAnswerCorrect);
    }
  }

  private onDiceChanged(diceValue: number): void {
    this.movePawn(this.currentPlayer.pawn, diceValue);
  }

  private onPawnMoved(category?: string): void {
    if (this.isEndOfBoard(this.currentPlayer.pawn)) {
      S.removeAllChildren();
      new EndOfGame(this.getRanking()).center(S);
    }
    else if (category) {
      new QuestionPanelShowQuestion(this.getNextQuestion(category), this).center();
    }
    else {
      /// TODO : pipe.
      this.leftSection.enableDiceButton();
    }
    S.update();
  }

  private onPlayerAnswered(isAnswerCorrect: boolean): void {
    this.leftSection.enableDiceButton();
    if (!isAnswerCorrect) {
      this.setNextPlayer();
    }
    this.showPopUpCurrentPlayer();
  }

  private getNextQuestion(category: string): Question {
    const question: Question = this.questions.find((question: Question): boolean => {
      return question.category === category;
    })!;
    this.questions.push(this.questions.shift()!);
    return question;
  }

  private movePawn(pawn: Pawn, diceResult: number): void {
    this.leftSection.disableDiceButton();
    this.board.movePawn(pawn, diceResult);
  }

  private setNextPlayer(): void {
    let currentPlayerIndex: number = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];
  }

  private getFirstPlayer(): Player {
    return this.players[0];
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  set currentPlayer(value: Player) {
    this._currentPlayer = value;
    this.leftSection.updatePlayerName(this.currentPlayer);
  }

  private isEndOfBoard(pawn: Pawn): boolean {
    return this.board.isEndOfBoard(pawn);
  }

  private getRanking(): Player[] {
    const pawnRanking: Pawn[] = this.board.getPawnRanking();
    const playerRanking: Player[] = [];
    pawnRanking.forEach((pawn: Pawn): void => {
      playerRanking.push(this.getPlayerByPawn(pawn));
    });
    return playerRanking;
  }

  private getPlayerByPawn(pawn: Pawn): Player {
    let player = this.players.find((player: Player): boolean => {
      return player.pawn === pawn;
    });
    return player!;
  }

  private getCategories(): string[] {
    return [...new Set(this.questions.map((question: Question): string => {
      return question.category;
    }))];
  }

  private showPopUpCurrentPlayer(): void {
    new Label({
      text: 'C\'est au tour de ' + this.currentPlayer.name + ' de jouer !',
      labelWidth: W / 3,
      labelHeight: H / 3,
      align: CENTER,
      backgroundColor: this.currentPlayer.pawn.color,
      corner: 5,
      font: "Freckle Face",
      color: white
    })
      .center()
      .animate({
        props: {scale: 0},
        time: 1.5,
        rewind: true,
        from: true
      });
  }
}
