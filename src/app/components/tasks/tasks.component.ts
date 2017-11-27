// angular
import { Component, OnInit } from '@angular/core';

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
    return this.srv.tasks;
  }
  
  filter: string = 'all';

  constructor(
    private srv: TaskService
  ) { }

  ngOnInit() {
    this.srv.renderAllTasks();
  }

  /** VIEW FLOW */

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
    let name = newTaskName.trim();
    if (!name) {
      alert('Input not empty task name!');
      return;
    } 
    let task = {
      name: name.trim(),
      isCompleted: false
    };
    this.srv.addTask(task);
  }

  /** toggle current task property isCompleted*/
  toggleTask(task: Task) {
    this.srv.toggleTask(task);
  }

  /** toggle all tasks property isCompleted */
  toggleAllTasks(isCompleted: boolean) {
    this.srv.toggleAllTasks(isCompleted);
  }

  /** remove current task */
  removeTask(task: Task) {
    this.srv.removeTask(task);
  }

  /** remove all completed tasks*/
  removeCompletedTasks() {
    let completedTasks = this.filterTasks(true);
    this.srv.removeTasks(completedTasks);
  }

}