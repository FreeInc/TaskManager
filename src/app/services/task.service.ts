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
  renderAllTasks() {
    this.web.getTasks().subscribe((data) => {
      this.tasks = data;
      //TODO: update localstorage
    });
  }

  /** add new task */
  addTask(task: Task) {
    this.tasks.push(task);
    // TODO: update localstorage
    // TODO: Work with DB    
  }

  /** toggle current task property isComplete */
  toggleTask(task: Task) {
    task.isCompleted = !task.isCompleted;
    // TODO: update localstorage
  }

  /** toggle all tasks property isComplete */
  toggleAllTasks(isCompleted: boolean) {
  	this.tasks.forEach((task: Task) => task.isCompleted = isCompleted);
    // TODO: update localstorage
  }

  /** remove current task */
  removeTask(removedTask: Task) {
    this.tasks.splice(this.tasks.indexOf(removedTask), 1);
    // TODO: update localstorage
  }

  /** remove all completed tasks*/
  removeTasks(removedTasks: Task[]) {
    removedTasks.forEach((task: Task) => this.removeTask(task));
    // TODO: update localstorage
  }

  /** edit current task name */
  editTask(task: Task) {
    console.log(task);
    // TODO: update localstorage
  }


}
