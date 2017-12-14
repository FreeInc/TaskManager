// angular
import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import {TaskService} from '../../services/task.service';

// entities
import { Task } from '../../entities/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // property ( get tasks from task service )
  get tasks() {
    return this.taskService.tasks;
  }

  // filter for show/hide tasks
  filter: String = 'all';

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.renderAllTasks();
  }

  /** VIEW FLOW */

  /** toggle allTasks checkbox */
  isAllCompleted() {
    return this.tasks.length === this.filterTasks(true).length;
  }

  /** filter tasks by property isCompleted */
  filterTasks(isCompleted: Boolean) {
    return this.tasks.filter((task: Task) => task.isCompleted === isCompleted);
  }

  /** isShow */
  isShow(task: Task) {
    switch (this.filter) {

      case 'all':
        return true;

      case 'active':
        return !task.isCompleted;

      case 'completed':
        return task.isCompleted;

      default:
        return alert('WTF??? Where are you get this filter???');
    }
  }

  /** show all tasks*/
  showAllTasks() {
    this.filter = 'all';
  }

  /** show only active tasks */
  showActiveTasks() {
    this.filter = 'active';
  }

  /** show only completed tasks */
  showCompletedTasks() {
    this.filter = 'completed';
  }


  /** MODEL FLOW */

  /** add new task */
  addTask(newTaskName: string) {
    const name = newTaskName.trim();
    if (!name) {
      alert('Input not empty task name!');
      return;
    }
    const task = {
      name: name.trim(),
      isCompleted: false
    };
    this.taskService.addTask(task);
  }

  /** toggle current task property isCompleted*/
  toggleTask(task: Task) {
    this.taskService.toggleTask(task);
  }

  /** toggle all tasks property isCompleted */
  toggleAllTasks() {
    const isChecked = !this.isAllCompleted();
    this.taskService.toggleAllTasks(isChecked);
  }

  /** remove current task */
  removeTask(task: Task) {
    this.taskService.removeTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }

  /** remove all completed tasks*/
  removeCompletedTasks() {
    const completedTasks = this.filterTasks(true);
    this.taskService.removeTasks(completedTasks);
  }

}

