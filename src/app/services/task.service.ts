import { Injectable } from '@angular/core';

import { WebService } from './web.service';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

  public tasks;

  constructor(
    private webService: WebService
  ) {}

  renderAllTasks() {
    const localTasks = JSON.parse(localStorage.getItem('taskManager') || '[]');
    if (localTasks.length) {
      this.tasks = localTasks;
    } else {
      this.webService.getTasks().subscribe((data) => {
        if (data) {
          this.tasks = data;
        }
      });
    }
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  toggleTask(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.updateLocalStorage();
  }

  toggleAllTasks(isChecked) {
    this.tasks.forEach((task: Task) => task.isCompleted = isChecked);
    this.updateLocalStorage();
  }

  removeTask(removedTask: Task) {
    this.tasks.splice(this.tasks.indexOf(removedTask), 1);
    this.updateLocalStorage();
  }

  removeTasks(removedTasks: Task[]) {
    removedTasks.forEach((task: Task) => this.removeTask(task));
    this.updateLocalStorage();
  }

  updateTask(task: Task) {
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('taskManager', JSON.stringify(this.tasks));
  }

}
