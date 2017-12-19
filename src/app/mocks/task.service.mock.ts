import { Injectable } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable()
export class TaskServiceMock {

  private __tasks: Task[] = [
    { name: 'Learn Angular 5', isCompleted: true},
    { name: 'Kill them all', isCompleted: false}
  ];

  public tasks;

  constructor() {}

  renderAllTasks(): void {
    this.tasks = this.__tasks;
  }

  addTask(task: any): void {}

  toggleTask(task: Task): void {}

  toggleAllTasks(isCompleted: boolean): void {}

  removeTask(removedTask: Task): void {}

  removeTasks(removedTasks: Task[]): void {}

  updateTask(task: Task): void {}

  updateLocalStorage(): void {}

}
