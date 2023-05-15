import { Observer } from '@app/ui/observers/observer';

// Observable interface of the Observer pattern
export interface Observable {

  subscribe(observer: Observer): void;

  notifyAll(data?: any): void;
}
