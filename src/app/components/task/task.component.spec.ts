import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { Task } from '../../entities/task';


describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
    const taskInTest: Task = {
      name: "Super task",
      isCompleted: false
    }
    expect(component).toBeTruthy();
    
    component.currentTask = taskInTest;
    fixture.detectChanges();

    var lblName = fixture.debugElement.query(By.css('label'));
    expect(lblName).not.toBeNull();
  });
*/

});
