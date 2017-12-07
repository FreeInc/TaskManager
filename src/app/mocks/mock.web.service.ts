// angular
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

  // /** POST: add a new task to the server */
  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(tasksUrl, task, httpOptions);
  // }

  /** PUT: update task on the server */
  updateTask(task: Task): void {}

  /** DELETE task from the server */
  deleteTask(task: Task): void {}

  /** DELETE array of tasks from the server */
  deleteTasks(tasks: Task[]) {}

}
