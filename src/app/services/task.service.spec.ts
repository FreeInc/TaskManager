// @angular
import { TestBed } from '@angular/core/testing';

// services
import { TaskService } from './task.service';
import { WebService } from './web.service';

// models
import {Task} from '../models/task.model';

// mocks
import { WebServiceMock } from '../mocks/mock.web.service';

let taskService: TaskService;
let webService: WebService;

const tasks: Task[] = [
  { name: 'task 1', isCompleted: true },
  { name: 'task 2', isCompleted: false },
  { name: 'task 3', isCompleted: false },
  { name: 'task 4', isCompleted: true },
];
const task: Task = { name: 'task 1', isCompleted: true};

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

  it('call addTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.addTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call addTask() => add addedTask to tasks', () => {
    const addedTask = {name: 'rrrr', isCompleted: false};
    taskService.addTask(addedTask);
    expect(taskService.tasks).toContain(addedTask);
  });

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

  it('call removeTask() => remove removedTask from tasks', () => {
    const removedTask: Task = taskService.tasks[1];
    taskService.removeTask(removedTask);
    expect(taskService.tasks).not.toContain(removedTask);
  });

  it('call removeTask() => call TaskService.updateLocalStorage()', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call removeTasks() => call TaskService.removeTask() with removedTasks', () => {
    const spy = spyOn(taskService, 'removeTask');
    const removedTasks = [taskService.tasks[0], taskService.tasks[1]];
    taskService.removeTasks(tasks);
    expect(spy).toHaveBeenCalledWith(removedTasks[0]);
    expect(spy).toHaveBeenCalledWith(removedTasks[1]);
  });

  it('call removeTasks() => call TaskService.updateLocalStorage()', () => {
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
