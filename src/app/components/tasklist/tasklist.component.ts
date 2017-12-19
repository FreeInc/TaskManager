import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TaskListComponent implements OnInit {

  get tasks() {
    return this.taskService.tasks;
  }

  filter: String = 'all';

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.renderAllTasks();
  }

  isAllCompleted() {
    return this.tasks.length === this.filterTasks(true).length;
  }

  filterTasks(isCompleted: Boolean) {
    return this.tasks.filter((task: Task) => task.isCompleted === isCompleted);
  }

  isShow(task: Task) {
    switch (this.filter) {
      case 'all':
        return true;
      case 'active':
        return !task.isCompleted;
      case 'completed':
        return task.isCompleted;
      default:
        return console.log('WTF???');
    }
  }

  showAllTasks() {
    this.filter = 'all';
  }

  showActiveTasks() {
    this.filter = 'active';
  }

  showCompletedTasks() {
    this.filter = 'completed';
  }

  addTask(newTaskName: string) {
    const name = newTaskName.trim();
    if (!name) {
      console.log('Input not empty task name!');
      return;
    }
    const task = {
      name: name.trim(),
      isCompleted: false
    };
    this.taskService.addTask(task);
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task);
  }

  toggleAllTasks() {
    const isChecked = !this.isAllCompleted();
    this.taskService.toggleAllTasks(isChecked);
  }

  removeTask(task: Task) {
    this.taskService.removeTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }

  removeCompletedTasks() {
    const completedTasks = this.filterTasks(true);
    this.taskService.removeTasks(completedTasks);
  }

}
