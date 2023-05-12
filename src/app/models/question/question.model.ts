import { Proposition } from '@models/question/proposition.model';

export class Question {

  constructor(
    public id: string,
    public name: string, // The question itself
    public propositions: Proposition[],
    public category: string,
    public difficulty: string,
    public image?: string
  ) {
  }
}
