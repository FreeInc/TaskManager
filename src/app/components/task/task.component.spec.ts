import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { Task } from '../../entities/task';


describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskInTest: Task = {name:"test", isCompleted:false};

  const isEditMode: Boolean = false;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
 
    component.currentTask = taskInTest;
    fixture.detectChanges();

  });

  it('task label displays task name', () => {
    const lblName = fixture.debugElement.query(By.css('label'));
    expect(lblName).not.toBeNull();
    expect(lblName.nativeElement).not.toBeNull();
    expect(lblName.nativeElement.innerHTML).toEqual(taskInTest.name);
  });

  it('set edit mode ', () => {
    expect(component).toBeTruthy();
    component.editTask();
  });

});
