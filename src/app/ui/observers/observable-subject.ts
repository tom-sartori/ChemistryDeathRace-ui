import { Space } from '@ui-classes/board/space/space';
import { Player } from '@ui-classes/player/player';

export enum ObservableSubjectKind {
  diceChanged,
  PawnMoved,
  PlayerAnswered,
  ChallengeAnswered
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
    public isAnswerCorrect: boolean
  ) {
  }
}

export class ObservableSubjectChallengeAnswered {
  public kind: ObservableSubjectKind.ChallengeAnswered = ObservableSubjectKind.ChallengeAnswered;

  constructor(
    public isAnswerCorrect: boolean,
    public player: Player
  ) {
  }
}

export type ObservableSubject =
  ObservableSubjectDiceChanged
  | ObservableSubjectPawnMoved
  | ObservableSubjectPlayerAnswered
  | ObservableSubjectChallengeAnswered;
