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

  it('call removeCompletedTasks() => call taskService.removeTasks()', () => {
    const spy = spyOn(taskService, 'removeTasks').and.stub();

    component.removeCompletedTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask(task) => call taskService.toggleTask(task)', () => {
    const spy = spyOn(taskService, 'toggleTask').and.stub();

    component.toggleTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('call updateTask(task) => call taskService.updateTask(task)', () => {
    const spy = spyOn(taskService, 'updateTask').and.stub();

    component.updateTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('call removeTask(task) => call taskService.removeTask(task)', () => {
    const spy = spyOn(taskService, 'removeTask').and.stub();

    component.removeTask(tasks[0]);

    expect(spy).toHaveBeenCalledWith(tasks[0]);
  });

  it('call toggleAllTasks() => call taskService.toggleAllTasks(isChecked)', () => {
    const spy = spyOn(taskService, 'toggleAllTasks').and.stub();
    const isChecked = component.isAllCompleted();

    component.toggleAllTasks();

    expect(spy).toHaveBeenCalledWith(!isChecked);
  });

  it('call showActiveTasks() => set filter value equal to "active"', () => {
    component.showActiveTasks();

    expect(component.filter).toBe('active');
  });

  it('call showActiveTasks() => set filter value equal to "active"', () => {
    const spy = spyOn(console, 'log').and.stub();
    component.filter = 'qqqqq';
    fixture.detectChanges();

    component.showActiveTasks();

    expect(spy).toHaveBeenCalledWith('WTF???');
  });

  it('call showActiveTasks() => active task pass the visibility checking', () => {
    component.showActiveTasks();
    const activeResult = component.isShow(tasks[1]);

    expect(activeResult).toBe(true);
  });

  it('call showActiveTasks() => completed task do not pass the visibility checking', () => {
    component.showActiveTasks();
    const completedResult = component.isShow(tasks[0]);

    expect(completedResult).toBe(false);
  });

  it('call showCompletedTasks() => set filter value equal to "completed"', () => {
    component.showCompletedTasks();
    const filter = component.filter;

    expect(filter).toBe('completed');
  });

  it('call showCompletedTasks() => completed task pass the visibility checking', () => {
    component.showCompletedTasks();
    const activeResult = component.isShow(tasks[0]);

    expect(activeResult).toBe(true);
  });

  it('call showCompletedTasks() => active task do not pass the visibility checking', () => {
    component.showCompletedTasks();
    const completedResult = component.isShow(tasks[1]);

    expect(completedResult).toBe(false);
  });

  it('call showAllTasks() => set filter value equal to "all"', () => {
    component.showAllTasks();
    const filter = component.filter;

    expect(filter).toBe('all');
  });

  it('call showCompletedTasks() => any task pass the visibility checking', () => {
    component.showAllTasks();
    const result = component.isShow(task);

    expect(result).toBe(true);
  });

  it('call addTask() with empty name => do not call taskService.addTask()', () => {
    const spy = spyOn(taskService, 'addTask').and.stub();

    component.addTask('  ');

    expect(spy).not.toHaveBeenCalled();
  });

  it('call addTask() with empty name => call taskService.addTask(task)', () => {
    task = { name: 'TaskName', isCompleted: false };
    const spy = spyOn(taskService, 'addTask').and.stub();

    component.addTask('  TaskName     ');

    expect(spy).toHaveBeenCalledWith(task);
  });

});
