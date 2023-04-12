import {Pawn} from "./pawn";

export class Player extends Container {

  private _playerId: number;
  private _playerName: string;
  private _playerPawn: Pawn;


  constructor(playerId: number, playerName: string, playerPawn: Pawn) {
    super();
    this._playerId = playerId;
    this._playerName = playerName;
    this._playerPawn = playerPawn;
  }

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
  }

  get playerName(): string {
    return this._playerName;
  }

  set playerName(value: string) {
    this._playerName = value;
  }

  get playerPawn(): Pawn {
    return this._playerPawn;
  }

  set playerPawn(value: Pawn) {
    this._playerPawn = value;
  }
}
