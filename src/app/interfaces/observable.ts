import { Observer } from './observer';

export interface Observable {
  subscribe(observer: Observer): void;

  notifyAll(): void;
}
