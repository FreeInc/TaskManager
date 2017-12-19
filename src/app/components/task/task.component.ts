import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {

  isEditMode: Boolean = false;

  @Input() currentTask: Task;
  @Output() onToggle = new EventEmitter<Task>();
  @Output() onRemove = new EventEmitter<Task>();
  @Output() onUpdate = new EventEmitter<Task>();

  constructor() { }

  toggle() {
    this.onToggle.emit(this.currentTask);
  }

  remove() {
    this.onRemove.emit(this.currentTask);
  }

  update(name: string) {
    const value = name.trim();
    if (!value) {
      console.log('Empty task name');
    } else if (value === this.currentTask.name) {
      console.log('Same task name');
    } else {
      this.currentTask.name = value;
      this.onUpdate.emit(this.currentTask);
    }
    this.editReset();
  }

  editTask() {
    this.isEditMode = true;
    // focus on input after timeout (for waiting element appearance)
    setTimeout(this.editInputFocus, 0);
  }

  editInputFocus() {
    const inputEdit: HTMLElement = <HTMLElement>document.getElementById('edit');
    if (inputEdit) {
      inputEdit.focus();
    }
  }

  editReset() {
    this.isEditMode = false;
  }

}
