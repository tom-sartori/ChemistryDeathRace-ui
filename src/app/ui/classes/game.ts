import { Question } from '@models/question/question.model';
import { AnimatePopup } from '@ui-components/animate-popup';
import { Board } from '@ui-classes/board/board';
import { Pawn } from '@ui-classes/player/pawn';
import { Player } from '@ui-classes/player/player';
import {
  blue_enscm,
  boardWidthProportion,
  framePaddingProportion,
  onStopOnSpaceAnimationTimeout,
  pawnColors,
  pawnDiameterProportion,
  spaceMargin,
  turquoise_enscm
} from '@ui-constants/ui-constants';
import { boardCols, boardRows } from '@ui-constants/game-constants';
import { Pause } from '@ui-classes/pause/pause';
import { LeftSection } from '@ui-classes/left-section/left-section';
import {
  ObservableSubject,
  ObservableSubjectGameEnded,
  ObservableSubjectKind,
  ObservableSubjectPlayerAnswered
} from '@ui-observers/observable-subject';
import { Space } from '@ui-classes/board/space/space';
import { EndOfGame } from '@ui-classes/end-of-game/end-of-game';
import { SpaceClassic } from '@ui-classes/board/space/space-classic';
import { QuestionPanelShowQuestion } from '@ui-classes/question-panel/question-panel-show-question';
import { SpacePipe } from '@ui-classes/board/space/space-pipe';
import { SpaceChallenge } from '@ui-classes/board/space/space-challenge';
import { Observer } from '@ui-observers/observer';
import { FullscreenButton } from '@ui-components/fullscreen-button';
import { Button } from '@ui-components/button';
import { EventManager } from '@ui-classes/EventManager';
import { shuffle } from 'lodash';
import { Observable } from '@ui-observers/observable';

new EventManager(); // Used to set default event listeners with passive: false.

export class Game implements Observer, Observable {

  private board: Board;
  private leftSection: LeftSection;
  public readonly players: Player[];

  private _currentPlayer: Player;
  private pause: Pause;
  private questions: Question[];

  private observers: Observer[];

  constructor(playerNames: string[], questions: Question[], diceSize: number) {
    // W < H ? Portrait : Landscape.
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
    this.questions = shuffle(questions);

    // Board.
    this.board = new Board(spaceSideSize, pawns, this.getCategories());
    this.board.subscribe(this);

    // Left section.
    this.leftSection = new LeftSection(this.currentPlayer, diceSize);
    this.leftSection.subscribe(this);

    this.pause = new Pause(this.getCategories()); // Categories are used to display a help message with the legend of the board.

    this.initTopButtons();
    this.initUI();
    this.observers = [];
  }

  private initTopButtons(): void {
    const size: number = 175;
    new FullscreenButton(size / 3).addTo(S);
    new Button({
      text: "Catégories",
      width: size,
      height: size / 3,
      backgroundColor: "rgba(0,0,0,0)",
      textColor: blue_enscm,
      rollBackgroundColor: turquoise_enscm
    }).tap(() => {
      this.pause.toggle();
    }).addTo(S).pos(W - size, 0);
  }

  private initUI(): void {
    const cols: number = W < H ? 1 : 2;
    const rows: number = W < H ? 2 : 1;

    new Tile({
      obj: series([this.leftSection, this.board]),
      cols, rows,
      align: 'center',
      valign: 'center',
      spacingH: 70,
      spacingV: 40,
      clone: false
    }).center();
  }

  public update(observableSubject: ObservableSubject): void {
    switch (observableSubject.kind) {
      case ObservableSubjectKind.diceChanged:
        this.onDiceChanged(observableSubject.diceValue)
        break;
      case ObservableSubjectKind.PawnMoved:
        this.onPawnMoved(observableSubject.space);
        break;
      case ObservableSubjectKind.PlayerAnswered:
        this.onPlayerAnswered(observableSubject.isAnswerCorrect, observableSubject.questionId);
        break;
      case ObservableSubjectKind.ChallengeAnswered:
        this.onChallengeAnswered(observableSubject.player);
        break;
    }
  }

  public onDiceChanged(diceValue: number): void {
    this.movePawn(this.currentPlayer.pawn, diceValue);
  }

  private onPawnMoved(space: Space): void {
    space.onStopOnSpace();
    setTimeout((): void => {
      if (this.isEndOfBoard(this.currentPlayer.pawn)) {
        S.removeAllChildren();
        new EndOfGame(this.getRanking()).center(S);
        this.notifyAll(new ObservableSubjectGameEnded())
      }
      else if (space instanceof SpaceClassic) {
        new QuestionPanelShowQuestion(this.getNextQuestion(space.category), this, SpaceClassic).center();
      }
      else if (space instanceof SpacePipe) {
        this.movePawn(this.currentPlayer.pawn, space.length);
      }
      else if (space instanceof SpaceChallenge) {
        new QuestionPanelShowQuestion(this.getNextQuestion(space.category), this, SpaceChallenge).center();
      }
      S.update();
    }, onStopOnSpaceAnimationTimeout + 100);
  }

  private onPlayerAnswered(isAnswerCorrect: boolean, questionId: string): void {
    this.leftSection.enableDiceButton();
    if (!isAnswerCorrect) {
      this.setNextPlayer();
    }
    this.showPopUpCurrentPlayer();
    this.notifyAll(new ObservableSubjectPlayerAnswered(isAnswerCorrect, questionId));
  }

  private onChallengeAnswered(player: Player): void {
    this.leftSection.enableDiceButton();
    this.setNextPlayer(player);
    this.showPopUpCurrentPlayer();
  }

  private getNextQuestion(category: string): Question {
    const question: Question = this.questions.find((question: Question): boolean => {
      return question.category === category;
    })!;
    this.questions.push(this.questions.shift()!);
    return question;
  }

  /// TODO : Rename to Move player.
  private movePawn(pawn: Pawn, diceResult: number): void {
    this.board.movePawn(pawn, diceResult);
  }

  private setNextPlayer(player?: Player): void {
    if (player) {
      this.currentPlayer = player
    }
    else {
      let currentPlayerIndex: number = this.players.indexOf(this.currentPlayer);
      this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];
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
    new AnimatePopup(this.currentPlayer.name, this.currentPlayer.pawn.color).makeAnimation();
  }

  public notifyAll(data?: any): void {
    this.observers.forEach((observer: Observer) => observer.update(data));
  }

  public subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
}
