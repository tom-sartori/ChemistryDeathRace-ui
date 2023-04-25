import { Observable } from './observable';

export interface Observer {

  update(subject: Observable): void;
}
