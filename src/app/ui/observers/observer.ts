import { ObservableSubject } from '@ui-observers/observable-subject';

export interface Observer {

  update(observableSubject: ObservableSubject): void;
}
