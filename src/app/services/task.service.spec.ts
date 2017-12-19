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

  it('renderAllTasks() does not call the webService.getTasks() if the local storage returns an array of tasks', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(tasks));

    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renderAllTasks() calls the webService.getTasks() if the local storage returns an empty array', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('renderAllTasks() calls the webService.getTasks() if the local storage returns a null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const spy = spyOn(webService, 'getTasks').and.callThrough();

    taskService.renderAllTasks();

    expect(spy).toHaveBeenCalled();
  });

  it('addTask() calls the taskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.addTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('addTask() adds the addedTask to the array of tasks', () => {
    const addedTask = {name: 'rrrr', isCompleted: false};

    taskService.addTask(addedTask);

    expect(taskService.tasks).toContain(addedTask);
  });

  it('toggleTask() calls the taskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.toggleTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('toggleTask() sets the task.isCompleted to the "false" if it was "true"', () => {
    tasks[0].isCompleted = true;

    taskService.toggleTask(tasks[0]);

    expect(tasks[0].isCompleted).toBe(false);
  });

  it('toggleTask() sets the task.isCompleted to "true" if it was "false"', () => {
    tasks[0].isCompleted = false;

    taskService.toggleTask(tasks[0]);

    expect(tasks[0].isCompleted).toBe(true);
  });

  it('toggleAllTask() calls the TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.toggleAllTasks(true);

    expect(spy).toHaveBeenCalled();
  });

  it('toggleAllTask(true) sets the property "isCompleted" of all tasks equal to "true"', () => {
    taskService.toggleAllTasks(true);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === true;
    });

    expect(_tasks.length).toBe(taskService.tasks.length);
  });

  it('toggleAllTask(false) sets the property "isCompleted" of all tasks equal to "false"', () => {
    taskService.toggleAllTasks(false);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === false;
    });

    expect(_tasks.length).toBe(taskService.tasks.length);
  });

  it('removeTask(removedTask) removes the "removedTask" from the array of tasks', () => {
    const removedTask: Task = taskService.tasks[1];

    taskService.removeTask(removedTask);

    expect(taskService.tasks).not.toContain(removedTask);
  });

  it('removeTask(removedTask) calls the taskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.removeTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('removeTasks(removedTasks) calls the taskService.removeTask() for all tasks from the array "removedTasks"', () => {
    const spy = spyOn(taskService, 'removeTask').and.stub();
    const removedTasks = [taskService.tasks[0], taskService.tasks[1]];

    taskService.removeTasks(tasks);

    expect(spy).toHaveBeenCalledWith(removedTasks[0]);
    expect(spy).toHaveBeenCalledWith(removedTasks[1]);
  });

  it('removeTasks(removedTasks) calls the taskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.removeTasks(tasks);

    expect(spy).toHaveBeenCalled();
  });

  it('updateTask(updatedTask) calls the taskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage').and.stub();

    taskService.updateTask(tasks[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('updateLocalStorage() calls the localStorage.setItem() with the param "taskManager"', () => {
    const spy = spyOn(localStorage, 'setItem').and.stub();

    taskService.updateLocalStorage();

    expect(spy).toHaveBeenCalledWith('taskManager', JSON.stringify(tasks));
  });

});
