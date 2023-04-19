import { Optional } from '@angular/core';
import { Proposition } from './proposition.model';

export class Question {

  constructor(
    public id: string,
    public name: string,
    public propositions: Proposition[],
    public category: string,
    public difficulty: string,
    @Optional() public image: string
  ) {
  }
}
