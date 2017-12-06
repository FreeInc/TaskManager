import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { Task } from '../../entities/task';

import { TaskService } from '../../services/task.service';

// mocks
import { TaskServiceMock } from '../../mocks/mock.task.service';


describe('TaskComponent', () => {

  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;

  const taskInTest: Task = { name: 'testName', isCompleted: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [
        { provide: TaskService, useClass: TaskServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.get(TaskService);
    component.currentTask = taskInTest;
    jasmine.clock().install();
    fixture.detectChanges();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('task label displays task name', () => {
    const lblName = fixture.debugElement.query(By.css('label'));
    expect(lblName).not.toBeNull();
    expect(lblName.nativeElement).not.toBeNull();
    expect(lblName.nativeElement.innerHTML).toEqual(taskInTest.name);
  });

  it('set edit mode ', () => {
    expect(component.isEditMode).toBeFalsy();
    component.editTask();
    expect(component.isEditMode).toBeTruthy();
  });



  xit('focus on input (#edit) ', () => {

    setTimeout(function() {
      component.editTask();
    }, 1);

    jasmine.clock().tick(100);

    let inputEdit = fixture.debugElement.query(By.css('input#edit'));
    console.log(inputEdit);

    jasmine.clock().tick(100);

    inputEdit = fixture.debugElement.query(By.css('input#edit'));
    console.log(inputEdit);

    // const spy = spyOn(inputEdit, 'focus');
    //
    // component.editTask();
    //
    //
    // setTimeout(function() {
    //   component.editTask();
    // }, 1);
    //
    //
    // jasmine.clock().tick(0);
    //
    expect(inputEdit).toBeTruthy();
    // expect(spy).toHaveBeenCalled();
  });


  it('reset edit mode ', () => {
    component.editReset();
    expect(component.isEditMode).toBeFalsy();
  });


  it('run toggle emitter', () => {
    const spy = spyOn(component.onToggle, 'emit').and.stub();
    component.toggle();
    expect(spy).toHaveBeenCalledWith(taskInTest);
  });

  it('run remove emitter', () => {
    const spy = spyOn(component.onRemove, 'emit').and.stub();
    component.remove();
    expect(spy).toHaveBeenCalledWith(taskInTest);
  });

  it('run update emitter', () => {
    const spy = spyOn(component.onUpdate, 'emit').and.stub();
    component.update('');
    expect(spy).not.toHaveBeenCalled();
    component.update('testName');
    expect(spy).not.toHaveBeenCalled();
    component.update('anotherName');
    expect(spy).toHaveBeenCalledWith(taskInTest);
  });

});
