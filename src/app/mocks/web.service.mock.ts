import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Task } from '../models/task.model';
import { TASKS } from '../models/storage';

@Injectable()
export class WebServiceMock {

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

}
