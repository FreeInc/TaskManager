// @angular
import { Injectable } from '@angular/core';

// models
import { Task } from '../models/task.model';

@Injectable()
export class TaskServiceMock {

  private __tasks: Task[] = [
    { name: 'Learn Angular 5', isCompleted: true},
    { name: 'Kill them all', isCompleted: false}
  ];

  public tasks;

  constructor() {}

  /** render task list */
  renderAllTasks(): void {
    this.tasks = this.__tasks;
  }

  /** add new task */
  addTask(task: any): void {}

  /** toggle current task property isComplete */
  toggleTask(task: Task): void {}

  /** toggle all tasks property isComplete */
  toggleAllTasks(isCompleted: boolean): void {}

  /** remove current task */
  removeTask(removedTask: Task): void {}

  /** remove all completed tasks*/
  removeTasks(removedTasks: Task[]): void {}

  /** edit current task name */
  updateTask(task: Task): void {}

  /** save tasks to local storage*/
  updateLocalStorage(): void {}

}
