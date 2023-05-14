import { Space } from '@ui-classes/board/space/space';
import { Player } from '@ui-classes/player/player';

export enum ObservableSubjectKind {
  diceChanged,
  PawnMoved,
  PlayerAnswered,
  ChallengeAnswered,
  GameEnded
}

export class ObservableSubjectDiceChanged {
  public kind: ObservableSubjectKind.diceChanged = ObservableSubjectKind.diceChanged;

  constructor(
    public diceValue: number
  ) {
  }
}

export class ObservableSubjectPawnMoved {
  public kind: ObservableSubjectKind.PawnMoved = ObservableSubjectKind.PawnMoved;

  constructor(
    public space: Space
  ) {
  }
}

export class ObservableSubjectPlayerAnswered {
  public kind: ObservableSubjectKind.PlayerAnswered = ObservableSubjectKind.PlayerAnswered;

  constructor(
    public isAnswerCorrect: boolean,
    public questionId: string
  ) {
  }
}

export class ObservableSubjectChallengeAnswered {
  public kind: ObservableSubjectKind.ChallengeAnswered = ObservableSubjectKind.ChallengeAnswered;

  constructor(
    public player: Player
  ) {
  }
}

export class ObservableSubjectGameEnded {
  public kind: ObservableSubjectKind.GameEnded = ObservableSubjectKind.GameEnded;

  constructor() {
  }
}

export type ObservableSubject =
  ObservableSubjectDiceChanged
  | ObservableSubjectPawnMoved
  | ObservableSubjectPlayerAnswered
  | ObservableSubjectChallengeAnswered
  | ObservableSubjectGameEnded;
