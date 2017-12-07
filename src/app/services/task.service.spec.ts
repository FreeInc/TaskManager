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

// const completedTask: Task = { name: 'task 1', isCompleted: true };
// const activeTask: Task = { name: 'task 2', isCompleted: false };

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

  // TaskService
  it('TaskService should be created', () => {
    expect(taskService).toBeTruthy();
  });

  // renderAllTasks()
  it('call renderAllTasks() => call WebService.getTasks()', () => {
    const spy = spyOn(webService, 'getTasks').and.callThrough();
    taskService.renderAllTasks();
    expect(spy).toHaveBeenCalled();
  });

  // TODO: func


  // addTask()

  it('call addTask() => call TaskService.updateLocalStorage() ', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.addTask(task);
    expect(spy).toHaveBeenCalled();
  });

  // TODO: func


  // toggleTask()

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

  // removeTask()

  // TODO: func

  it('call removeTask() => call TaskService.updateLocalStorage() ', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTask(task);
    expect(spy).toHaveBeenCalled();
  });


  // removeTasks()

  // TODO: func

  it('call removeTasks() => call TaskService.updateLocalStorage() ', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTasks(tasks);
    expect(spy).toHaveBeenCalled();
  });


  // updateTask()

  // TODO: func

  it('call updateTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.updateTask(task);
    expect(spy).toHaveBeenCalled();
  });

  // updateLocalStorage()

  it('call updateLocalStorage() => call localStorage.setItem()', () => {
    const spy = spyOn(localStorage, 'setItem');
    taskService.updateLocalStorage();
    expect(spy).toHaveBeenCalledWith('taskManager', JSON.stringify(tasks));
  });

});
