import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private _playersNumber: number = 1;
  private _playersName: string[] = [];
  private _diceSize: number = 6;
  private _difficulty : string | undefined;

  constructor() { }


  get playersNumber(): number {
    return this._playersNumber;
  }

  set playersNumber(value: number) {
    this._playersNumber = value;
  }

  get playersName(): string[] {
    return this._playersName;
  }

  set playersName(value: string[]) {
    this._playersName = value;
  }

  get diceSize(): number {
    return this._diceSize;
  }

  set diceSize(value: number) {
    this._diceSize = value;
  }

  get difficulty(): string {
    if (this._difficulty === undefined) {
      return "Pas de difficulté";
    } else {
      return this._difficulty;
    }
  }

  set difficulty(value: string) {
    this._difficulty = value;
  }
}
