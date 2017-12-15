// @angular
import { Injectable } from '@angular/core';

// rxjs library
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// entities
import { Task } from '../entities/task';
import { TASKS } from '../entities/storage';


// Data Access Service
@Injectable()
export class WebServiceMock {

  constructor() {}

  /** GET array of tasks from the server */
  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

}
