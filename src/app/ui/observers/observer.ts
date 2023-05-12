import { ObservableSubject } from '@ui-observers/observable-subject';

// Observer interface of the Observer pattern
export interface Observer {

  update(observableSubject: ObservableSubject): void;
}
