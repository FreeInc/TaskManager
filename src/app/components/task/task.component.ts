import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// entities
import { Task } from '../../entities/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  // edit mode for task name on/off
  isEditMode: Boolean = false;

  // import task from tasks
  @Input() currentTask: Task;

  // export emitters to the tasks
  @Output() onToggle = new EventEmitter<Task>();
  @Output() onRemove = new EventEmitter<Task>();
  @Output() onUpdate = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  /** toggle current task property isCompleted*/
  toggle() {
    this.onToggle.emit(this.currentTask);
  }

  /** remove current task */
  remove() {
    this.onRemove.emit(this.currentTask);
  }

  /** updateTask current task name */
  update(name: string) {

    const value = name.trim();

    if (!value) {
      console.log('Empty task name');
    } else if (value === this.currentTask.name) {
      console.log('Same task name');
    } else {
      this.currentTask.name = value;
    }

    this.onUpdate.emit(this.currentTask);
    this.isEditMode = false;
  }

  /** open task name edit mode*/
  editTask() {
    this.isEditMode = true;

    // focus on input after timeout (for waiting element appearance)
    setTimeout(this.editInputFocus, 0);
  }

  /** focus on input for task name editing*/
  editInputFocus() {
    const inputEdit: HTMLElement = <HTMLElement>document.getElementById('edit');
    inputEdit.focus();
  }

  /** reset task name editing   */
  editReset() {
    this.isEditMode = false;
  }

}
