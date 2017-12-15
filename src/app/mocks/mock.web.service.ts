// @angular
import { Injectable } from '@angular/core';

// rxjs library
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// models
import { Task } from '../models/task.model';
import { TASKS } from '../models/storage';

@Injectable()
export class WebServiceMock {

  constructor() {}

  /** GET array of tasks from the server */
  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

}
