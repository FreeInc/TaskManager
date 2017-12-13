// angular
import { Injectable } from '@angular/core';

// entities
import { Task } from '../entities/task';

// services
import { WebService } from './web.service';



// Task Service
@Injectable()
export class TaskService {

  public tasks;

  constructor(
    private web: WebService
  ) {}

  /** render task list */
  renderAllTasks(): void {
    this.web.getTasks().subscribe((data) => {
      const localTasks = JSON.parse(localStorage.getItem('taskManager') || '[]');
      if (localTasks.length) {
        this.tasks = localTasks;
      } else {
        this.tasks = data;
      }
    });
  }

  /** add new task */
  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  /** toggle current task property isComplete */
  toggleTask(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.updateLocalStorage();
  }

  /** toggle all tasks property isComplete */
  toggleAllTasks(isCompleted: boolean): void {
    this.tasks.forEach((task: Task) => task.isCompleted = isCompleted);
    this.updateLocalStorage();
  }

  /** remove current task */
  removeTask(removedTask: Task): void {
    this.tasks.splice(this.tasks.indexOf(removedTask), 1);
    this.updateLocalStorage();
  }

  /** remove all completed tasks*/
  removeTasks(removedTasks: Task[]): void {
    removedTasks.forEach((task: Task) => this.removeTask(task));
    this.updateLocalStorage();
  }

  /** edit current task name */
  updateTask(task: Task): void {
    this.updateLocalStorage();
  }

  /** save tasks to browser local storage*/
  updateLocalStorage(): void {
    localStorage.setItem('taskManager', JSON.stringify(this.tasks));
  }

}
