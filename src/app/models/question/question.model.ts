import { Proposition } from './proposition.model';

export class Question {

  constructor(
    public id: string,
    public name: string,
    public propositions: Proposition[],
    public category: string,
    public difficulty: string,
    public image?: string
  ) {
  }
}
