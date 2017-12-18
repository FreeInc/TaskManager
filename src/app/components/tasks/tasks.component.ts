import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { ADD_TASK, REMOVE_TASK, REMOVE_TASKS, UPDATE_TASK } from '../../reducers/tasks.reducer';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  filter: String = 'all';

  constructor(
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store.select('tasks').subscribe((data: any) => {
      this.tasks = data;
    });
  }

  /** VIEW FLOW */

  /** filter tasks by property isCompleted */
  filterTasks(isCompleted: Boolean) {
    return this.tasks.filter((task: Task) => task.isCompleted === isCompleted);
  }

  /** toggle allTasks checkbox */
  isAllCompleted() {
    return this.tasks.length === this.filterTasks(true).length;
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
        return console.log('WTF???');
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
      console.log('Input not empty task name!');
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
    task.isCompleted = !task.isCompleted;
    this.store.dispatch({type: UPDATE_TASK, payload: task});
  }

  /** toggle all tasks property isCompleted */
  toggleAllTasks() {
    const isChecked = !this.isAllCompleted();
    this.tasks.forEach((task: Task) => {
      task.isCompleted = isChecked;
      this.store.dispatch({type: UPDATE_TASK, payload: task});
    });
  }

  /** remove current task */
  removeTask(task: Task) {
    this.store.dispatch({type: REMOVE_TASK, payload: task});
  }

  /** update current task */
  updateTask(task: Task) {
    this.store.dispatch({type: UPDATE_TASK, payload: task});
  }

  /** remove all completed tasks*/
  removeCompletedTasks() {
    const completedTasks = this.filterTasks(true);
    this.store.dispatch({type: REMOVE_TASKS, payload: completedTasks});
  }

}
