import { Observer } from '@interfaces/observer';

export interface Observable {

  subscribe(observer: Observer): void;

  notifyAll(data?: any): void;
}
