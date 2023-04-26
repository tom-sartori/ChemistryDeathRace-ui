import { ObservableSubject } from '@classes/ObservableSubject';

export interface Observer {

  update(observableSubject: ObservableSubject): void;
}
