import { ObservableSubject } from '@observers/observable-subject';

export interface Observer {

  update(observableSubject: ObservableSubject): void;
}
