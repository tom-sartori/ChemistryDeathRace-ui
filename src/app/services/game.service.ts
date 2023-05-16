import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '@models/game/game.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Answer } from '@models/game/answer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = `${environment.apiUrl}/game`
  }

  public createNewGame(numberOfPlayers: number, difficulty: string, diceSize: number): Observable<Game> {
    return this.http.post<Game>(`${this.serviceUrl}`, {numberOfPlayers, difficulty, diceSize});
  }

  public sendResult(gameId: string, questionId: string, isAnswerCorrect: boolean): Observable<Answer> {
    return this.http.put<Answer>(`${this.serviceUrl}/answer/${gameId}`, {
      "questionId": questionId,
      "correct": isAnswerCorrect
    });
  }

  public endGame(id: string): Observable<any> {
    return this.http.put<any>(`${this.serviceUrl}/close/${id}`, {});
  }
}
