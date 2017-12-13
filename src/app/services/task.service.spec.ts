import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { WebService } from './web.service';


import {Task} from '../entities/task';

// mocks
import { WebServiceMock } from '../mocks/mock.web.service';

let taskService: TaskService;
let webService: WebService;

const task: Task = { name: 'task 1', isCompleted: true };
const tasks = [
  { name: 'task 1', isCompleted: true },
  { name: 'task 2', isCompleted: false }
];


describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: WebService, useClass: WebServiceMock }
      ]
    });
    taskService = TestBed.get(TaskService);
    webService = TestBed.get(WebService);
    taskService.tasks = tasks;
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('call renderAllTasks() => call WebService.getTasks()', () => {
    const spy = spyOn(webService, 'getTasks').and.callThrough();
    taskService.renderAllTasks();
    expect(spy).toHaveBeenCalled();
  });

  it('call renderAllTasks() => get tasks from local storage (if local storage is not empty)');
  it('call renderAllTasks() => get tasks from web.service (if local storage is empty)');

  it('call addTask() => call TaskService.updateLocalStorage() ', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.addTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call addTask(addedTask) => add addedTask to tasks');

  it('call toggleTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.toggleTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask() => toggle task.isCompleted', () => {
    const status = task.isCompleted;
    taskService.toggleTask(task);
    expect(status).toBe(!task.isCompleted);
  });

  // toggleAllTasks()

  it('call toggleAllTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.toggleAllTasks(true);
    expect(spy).toHaveBeenCalled();
  });

  it('call toggleAllTask(true) => set all tasks isCompleted = true', () => {
    taskService.toggleAllTasks(true);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === true;
    });
    const result = (_tasks.length === taskService.tasks.length);
    console.log(result);
    expect(result).toBeTruthy();
  });

  it('call toggleAllTask(false) => set all tasks isCompleted = false', () => {
    taskService.toggleAllTasks(false);
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === false;
    });
    const result = (_tasks.length === taskService.tasks.length);
    expect(result).toBeTruthy();
  });

  it('call removeTask(removedTask) => remove removedTask from tasks');

  it('call removeTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call removeTasks(removedTasks) => remove removedTasks from tasks');

  it('call removeTasks() => call TaskService.updateLocalStorage() ', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTasks(tasks);
    expect(spy).toHaveBeenCalled();
  });

  it('call updateTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.updateTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call updateLocalStorage() => call localStorage.setItem()', () => {
    const spy = spyOn(localStorage, 'setItem');
    taskService.updateLocalStorage();
    expect(spy).toHaveBeenCalledWith('taskManager', JSON.stringify(tasks));
  });

});
