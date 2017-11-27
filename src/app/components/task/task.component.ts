import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// entities
import { Task } from '../../entities/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  isEditMode : boolean = false;

  @Input() currentTask: Task;

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
    console.log(name);
    // TODO: add implementation
    this.isEditMode = false;
  }


  /** open task name editing mode*/
  editTask() {
    this.isEditMode = true;
    // TODO: focus on current input
    /*
    let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('input.edit')[3];
    console.log(inputField);
    */
  }

  /** reset task name editing   */
  editReset() {
    this.isEditMode = false;
  }

}
