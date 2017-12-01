import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { Task } from '../../entities/task';
import {NO_ERRORS_SCHEMA} from '@angular/core';


fdescribe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let currentTask: Task;

  const isEditMode: Boolean = false;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('set edit mode ', () => {
    currentTask = {name: 'Edited task', isCompleted: false };
    component.editTask();
    expect(isEditMode).toBeTruthy();
  });





  it('task label is not to be Null ', () => {

    // const taskInTest: Task = {
    //   name: 'Super task',
    //   isCompleted: false
    // };

    expect(component).toBeTruthy();

    component.currentTask = currentTask;


    const lblName = fixture.debugElement.query(By.css('label'));
    expect(lblName).not.toBeNull();
  });

});
