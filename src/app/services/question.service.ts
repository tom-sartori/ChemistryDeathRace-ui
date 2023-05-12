import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from '@models/question/question.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly serviceUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.serviceUrl = `${environment.apiUrl}/question`
  }

  // Get all playable difficulties from the API
  public getAvailableDifficulties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.serviceUrl}/difficulty/available`);
  }

  // Get all the questions of a difficulty from the API
  public getQuestionsByDifficulty(difficulty: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.serviceUrl}/difficulty/${difficulty}`);
  }
}
