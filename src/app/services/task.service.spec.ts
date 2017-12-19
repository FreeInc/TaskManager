import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TaskService } from './task.service';
import { WebService } from './web.service';
import { Task } from '../models/task.model';
import { WebServiceMock } from '../mocks/web.service.mock';

describe('TaskService', () => {

  let taskService: TaskService;
  let webService: WebService;

  const tasks: Task[] = [
    { name: 'task 1', isCompleted: true },
    { name: 'task 2', isCompleted: false },
    { name: 'task 3', isCompleted: false },
    { name: 'task 4', isCompleted: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: WebService, useClass: WebServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    taskService = TestBed.get(TaskService);
    webService = TestBed.get(WebService);
    taskService.tasks = tasks;
  });

  it('call renderAllTasks() => do not call WebService.getTasks() if local storage return array of tasks', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(tasks));

    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();
    expect(spy).not.toHaveBeenCalled();
  });

  it('call renderAllTasks() => call WebService.getTasks() if local storage return empty array', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('call renderAllTasks() => call WebService.getTasks() if local storage return null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('call addTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.addTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('call addTask() => add addedTask to tasks', () => {
    const addedTask = {name: 'rrrr', isCompleted: false};

    taskService.addTask(addedTask);

    expect(taskService.tasks).toContain(addedTask);
  });

  it('call toggleTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.toggleTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask() => toggle task.isCompleted to false', () => {
    tasks[0].isCompleted = true;

    taskService.toggleTask(tasks[0]);

    expect(tasks[0].isCompleted).toBe(false);
  });

  it('call toggleTask() => toggle task.isCompleted to true', () => {
    tasks[0].isCompleted = false;

    taskService.toggleTask(tasks[0]);

    expect(tasks[0].isCompleted).toBe(true);
  });

  it('call toggleAllTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.toggleAllTasks(true);

    expect(spy).toHaveBeenCalled();
  });

  it('call toggleAllTask(true) => set all tasks isCompleted = true', () => {
    taskService.toggleAllTasks(true);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === true;
    });

    expect(_tasks.length).toBe(taskService.tasks.length);
  });

  it('call toggleAllTask(false) => set all tasks isCompleted = false', () => {
    taskService.toggleAllTasks(false);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === false;
    });

    expect(_tasks.length).toBe(taskService.tasks.length);
  });

  it('call removeTask() => remove removedTask from tasks', () => {
    const removedTask: Task = taskService.tasks[1];

    taskService.removeTask(removedTask);

    expect(taskService.tasks).not.toContain(removedTask);
  });

  it('call removeTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.removeTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('call removeTasks() => call TaskService.removeTask() with removedTasks', () => {
    const spy = spyOn(taskService, 'removeTask').and.stub();
    const removedTasks = [taskService.tasks[0], taskService.tasks[1]];

    taskService.removeTasks(tasks);

    expect(spy).toHaveBeenCalledWith(removedTasks[0]);
    expect(spy).toHaveBeenCalledWith(removedTasks[1]);
  });

  it('call removeTasks() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.removeTasks(tasks);

    expect(spy).toHaveBeenCalled();
  });

  it('call updateTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.updateTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('call updateLocalStorage() => call localStorage.setItem()', () => {
    const spy = spyOn(localStorage, 'setItem').and.stub();

    taskService.updateLocalStorage();

    expect(spy).toHaveBeenCalledWith('taskManager', JSON.stringify(tasks));
  });

});
