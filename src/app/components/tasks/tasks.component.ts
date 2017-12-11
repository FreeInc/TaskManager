// angular
import { Component, OnInit} from '@angular/core';

// services
import {TaskService} from '../../services/task.service';

// entities
import { Task } from '../../entities/task';

import { Store } from '@ngrx/store';
import { ADD_TASK, REMOVE_TASK, REMOVE_TASKS } from '../../reducers/task.reducer';
// import { getTasks, addTask, removeTask } from '../../reducers/task.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  // filter for show/hide tasks
  filter: String = 'all';

  constructor(
    private srv: TaskService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    // this.srv.renderAllTasks();
    this.store.select('tasks').subscribe((res: any) => {
      this.tasks = res;
    });
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

    const name = newTaskName.trim();
    if (!name) {
      alert('Input not empty task name!');
      return;
    }
    const task = {
      name: name.trim(),
      isCompleted: false
    };

    this.store.dispatch({type: ADD_TASK, payload: task});
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
    this.store.dispatch({type: REMOVE_TASK, payload: task});
  }

  updateTask(task: Task) {
    this.srv.updateTask(task);
  }

  /** remove all completed tasks*/
  removeCompletedTasks() {
    const completedTasks = this.filterTasks(true);
    this.store.dispatch({type: REMOVE_TASKS, payload: completedTasks});
  }

}
