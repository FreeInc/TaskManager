// @angular
import { Injectable } from '@angular/core';

// entities
import { Task } from '../models/task.model';

// services
import { WebService } from './web.service';

// Task Service
@Injectable()
export class TaskService {

  public tasks;

  constructor(
    private webService: WebService
  ) {}

  /** render task list */
  renderAllTasks() {
    this.webService.getTasks().subscribe((data) => {
      const localTasks = JSON.parse(localStorage.getItem('taskManager') || '[]');
      if (localTasks.length) {
        this.tasks = localTasks;
      } else {
        this.tasks = data;
      }
    });
  }

  /** add new task */
  addTask(task: Task) {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  /** toggle current task property isComplete */
  toggleTask(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.updateLocalStorage();
  }

  /** toggle all tasks property isComplete */
  toggleAllTasks(isChecked) {
    this.tasks.forEach((task: Task) => task.isCompleted = isChecked);
    this.updateLocalStorage();
  }

  /** remove current task */
  removeTask(removedTask: Task) {
    this.tasks.splice(this.tasks.indexOf(removedTask), 1);
    this.updateLocalStorage();
  }

  /** remove all completed tasks*/
  removeTasks(removedTasks: Task[]) {
    removedTasks.forEach((task: Task) => this.removeTask(task));
    this.updateLocalStorage();
  }

  /** edit current task name */
  updateTask(task: Task) {
    // arg task for update task in db
    this.updateLocalStorage();
  }

  /** save tasks to local storage*/
  updateLocalStorage() {
      localStorage.setItem('taskManager', JSON.stringify(this.tasks));
  }

}
