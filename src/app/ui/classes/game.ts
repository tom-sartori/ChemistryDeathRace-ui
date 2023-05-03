import { Observer } from '@observers/observer';
import { Board } from '@classes/board/board';
import { LeftSection } from '@classes/left-section/left-section';
import { Player } from '@classes/player/player';
import { Question } from '@models/question/question.model';
import {
  boardWidthProportion,
  framePaddingProportion,
  pawnColors,
  pawnDiameterProportion,
  spaceMargin
} from '@constants/ui-constants';
import { boardCols, boardRows } from '@constants/game-constants';
import { Pawn } from '@classes/player/pawn';
import { ObservableSubject, ObservableSubjectKind } from '@observers/observable-subject';
import { EndOfGame } from '@classes/end-of-game/end-of-game';
import { QuestionPanelShowQuestion } from '@classes/question-panel/question-panel-show-question';
import { Space } from '@classes/board/space/space';
import { SpacePipe } from '@classes/board/space/space-pipe';

const originalAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function (type, listener, options) {
  if (typeof options === 'object' && options !== null) {
    options.passive = options.passive || false;
  }
  else {
    options = {passive: false, capture: options};
  }
  originalAddEventListener.call(this, type, listener, options);
};

export class Game implements Observer {

  private readonly board: Board;
  private readonly leftSection: LeftSection;
  private readonly players: Player[];

  private fullScreenButton: Button;
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
    fullScreenButton.tap(() => {
      this.toggleFullScreen();
    });
    fullScreenButton.addTo(S);
    this.fullScreenButton = fullScreenButton;

    fullScreenButton.visible = !(window.navigator as any).standalone;
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
        this.onPlayerAnswered(observableSubject.isAnswerCorrect);
    }
  }

  private toggleFullScreen(): void {
    if (!document.fullscreenElement &&
      !(document as any).webkitFullscreenElement && // Chrome, Safari et Opera
      !(document as any).mozFullScreenElement && // Firefox
      !(document as any).msFullscreenElement) { // IE et Edge
      this.requestFullscreen(document.documentElement);
    }
    else {
      this.exitFullscreen();
    }
  }

  private requestFullscreen(element: HTMLElement) {
    const methodName = (
      element.requestFullscreen ||
      (element as any).webkitRequestFullscreen || // Chrome, Safari et Opera
      (element as any).mozRequestFullScreen || // Firefox
      (element as any).msRequestFullscreen // IE et Edge
    );

    if (methodName) {
      methodName.call(element);
    }
    else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert("Pour utiliser ce site en mode plein écran, veuillez l'ajouter à votre écran d'accueil en cliquant sur l'icône de partage et en sélectionnant \"Ajouter à l'écran d'accueil\".");
      }
      else {
        alert("Le mode plein écran n'est pas pris en charge par ce navigateur.");
      }
    }
  }

  private exitFullscreen() {
    const methodName = (
      document.exitFullscreen ||
      (document as any).webkitExitFullscreen || // Chrome, Safari et Opera
      (document as any).mozCancelFullScreen || // Firefox
      (document as any).msExitFullscreen // IE et Edge
    );

    if (methodName) {
      methodName.call(document);
    }
    else {
      alert("Le mode plein écran n'est pas pris en charge par ce navigateur.");
    }
  }

  public onDiceChanged(diceValue: number): void {
    this.movePawn(this.currentPlayer.pawn, diceValue);
  }

  private onPawnMoved(space: Space): void {
    if (this.isEndOfBoard(this.currentPlayer.pawn)) {
      S.removeAllChildren();
      new EndOfGame(this.getRanking()).center(S);
    }
    else if (space instanceof SpacePipe) {
      this.movePawn(this.currentPlayer.pawn, space.length);
    }
    else {
      /// TODO : SpaceClassic class.
      new QuestionPanelShowQuestion(this.getNextQuestion(space.category!), this).center();
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

  /// TODO : Rename to Move player.
  private movePawn(pawn: Pawn, diceResult: number): void {
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
