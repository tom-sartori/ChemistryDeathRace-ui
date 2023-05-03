import { Space } from '@classes/board/space/space';

export enum ObservableSubjectKind {
  diceChanged,
  PawnMoved,
  PlayerAnswered
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

export type ObservableSubject =
  ObservableSubjectDiceChanged
  | ObservableSubjectPawnMoved
  | ObservableSubjectPlayerAnswered;
