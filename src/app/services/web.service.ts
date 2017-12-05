// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs library
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// entities
import { Task } from '../entities/task';
import { TASKS } from '../entities/storage';


// params for http reguests
/** @param tasksUrl - argument url for http requests  */
const tasksUrl = '';
/** @param httpOptions - argument httpOptions for http requests  */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


// Data Access Service
@Injectable()
export class WebService {

  constructor(
    private http: HttpClient) {}

  /** GET array of tasks from the server */
  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(tasksUrl, task, httpOptions);
  }

  /** PUT: update task on the server */
  updateTask(task: Task): void {
    // TODO: implementation
  }

  /** DELETE task from the server */
  deleteTask(task: Task): void {
    // TODO: implementation
  }

  /** DELETE array of tasks from the server */
  deleteTasks(tasks: Task[]) {
    // TODO: implementation
  }

}
