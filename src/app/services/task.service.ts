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
      // TODO: write normal clever business logic
    });
  }

  /** add new task */
  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** toggle current task property isComplete */
  toggleTask(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** toggle all tasks property isComplete */
  toggleAllTasks(isCompleted: boolean): void {
    this.tasks.forEach((task: Task) => task.isCompleted = isCompleted);
    this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** remove current task */
  removeTask(removedTask: Task): void {
    this.tasks.splice(this.tasks.indexOf(removedTask), 1);
    this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** remove all completed tasks*/
  removeTasks(removedTasks: Task[]): void {
    removedTasks.forEach((task: Task) => this.removeTask(task));
      this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** edit current task name */
  updateTask(task: Task): void {
    this.updateLocalStorage();
    // TODO: Work with DB?
  }

  /** save tasks to localstorage*/
  updateLocalStorage(): void {
      localStorage.setItem('taskManager', JSON.stringify(this.tasks));
  }

}
