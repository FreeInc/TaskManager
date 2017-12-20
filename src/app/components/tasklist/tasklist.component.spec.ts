import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TaskListComponent } from './tasklist.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskServiceMock } from '../../mocks/task.service.mock';

describe('TaskListComponent', () => {

  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;
  let task: Task;

  const tasks: Task[] = [
    { name: 'task 1', isCompleted: true },
    { name: 'task 2', isCompleted: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [ { provide: TaskService, useClass: TaskServiceMock } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    taskService = TestBed.get(TaskService);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('removeCompletedTasks() calls the taskService.removeTasks()', () => {
    const spy = spyOn(taskService, 'removeTasks').and.stub();

    component.removeCompletedTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('toggleTask(task) calls the taskService.toggleTask(task)', () => {
    const spy = spyOn(taskService, 'toggleTask').and.stub();

    component.toggleTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('updateTask(task) calls the taskService.updateTask(task)', () => {
    const spy = spyOn(taskService, 'updateTask').and.stub();

    component.updateTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('removeTask(task) calls the taskService.removeTask(task)', () => {
    const spy = spyOn(taskService, 'removeTask').and.stub();

    component.removeTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('toggleAllTasks() calls the taskService.toggleAllTasks(isChecked)', () => {
    const spy = spyOn(taskService, 'toggleAllTasks').and.stub();
    const isChecked = component.isAllCompleted();

    component.toggleAllTasks();

    expect(spy).toHaveBeenCalledWith(!isChecked);
  });

  it('showActiveTasks() sets the filter equal to "active"', () => {
    component.showActiveTasks();

    expect(component.filter).toBe('active');
  });

  it('isShow(task) with unexpected filter calls console.log("WTF???")', () => {
    const spy = spyOn(console, 'log').and.stub();
    component.filter = 'qqqqq';
    fixture.detectChanges();

    component.isShow(task);

    expect(spy).toHaveBeenCalledWith('WTF???');
  });

  it('showActiveTasks(): active task passes the visibility checking', () => {
    component.showActiveTasks();
    const activeResult = component.isShow(tasks[1]);

    expect(activeResult).toBe(true);
  });

  it('showActiveTasks(): completed task does not pass the visibility checking', () => {
    component.showActiveTasks();
    const completedResult = component.isShow(tasks[0]);

    expect(completedResult).toBe(false);
  });

  it('showCompletedTasks() sets the filter equal to "completed"', () => {
    component.showCompletedTasks();
    const filter = component.filter;

    expect(filter).toBe('completed');
  });

  it('showCompletedTasks(): completed task passes the visibility checking', () => {
    component.showCompletedTasks();
    const activeResult = component.isShow(tasks[0]);

    expect(activeResult).toBe(true);
  });

  it('showCompletedTasks(): active task does not pass the visibility checking', () => {
    component.showCompletedTasks();
    const completedResult = component.isShow(tasks[1]);

    expect(completedResult).toBe(false);
  });

  it('showAllTasks() sets the filter equal to "all"', () => {
    component.showAllTasks();
    const filter = component.filter;

    expect(filter).toBe('all');
  });

  it('showCompletedTasks(): any task passes the visibility checking', () => {
    component.showAllTasks();

    expect(component.isShow(tasks[0])).toBe(true);
    expect(component.isShow(tasks[1])).toBe(true);
  });

  it('addTask(task) with empty name does not call the taskService.addTask()', () => {
    const spy = spyOn(taskService, 'addTask').and.stub();

    component.addTask('  ');

    expect(spy).not.toHaveBeenCalled();
  });

  it('addTask(task) with not empty name  calls the taskService.addTask(task)', () => {
    task = { name: 'TaskName', isCompleted: false };
    const spy = spyOn(taskService, 'addTask').and.stub();

    component.addTask('  TaskName     ');

    expect(spy).toHaveBeenCalledWith(task);
  });

});
