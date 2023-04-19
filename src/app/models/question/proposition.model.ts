import { Optional } from '@angular/core';

export class Proposition {

  constructor(
    public name: string,
    public answer: boolean,
    @Optional() public image: string
  ) {
  }
}
