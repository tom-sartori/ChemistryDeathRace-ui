import { Observer } from '@app/ui/observers/observer';

export interface Observable {

  subscribe(observer: Observer): void;

  notifyAll(data?: any): void;
}
