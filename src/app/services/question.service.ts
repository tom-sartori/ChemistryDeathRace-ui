import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from '@models/question/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly apiUrl: string;
  private readonly serviceUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = 'https://jj81jfqt3h.execute-api.eu-west-3.amazonaws.com';
    this.serviceUrl = `${this.apiUrl}/question`
  }

  public getDifficulties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.serviceUrl}/difficulty`);
  }

  public getQuestionsByDifficulty(difficulty: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.serviceUrl}/difficulty/${difficulty}`);
  }
}
