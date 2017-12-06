import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { WebService } from './web.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import {Task} from '../entities/task';


let taskService: TaskService;
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
      providers: [TaskService, WebService, HttpClient, HttpHandler]
    });
    taskService = TestBed.get(TaskService);
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('call updateLocalStorage', () => {
    const spy = spyOn(localStorage, 'setItem');
    taskService.updateLocalStorage();
    expect(spy).toHaveBeenCalled();
  });

  it('call updateTask', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.updateTask(task);
    expect(spy).toHaveBeenCalled();
  });

  it('call toggleTask', () => {
    const spy = spyOn(taskService, 'updateLocalStorage');
    const status = task.isCompleted;
    taskService.toggleTask(task);
    expect(spy).toHaveBeenCalled();
    expect(status).toBe(!task.isCompleted);
  });

  it('call toggleAllTask with "true"', () => {
    taskService.tasks = tasks;
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.toggleAllTasks(true);
    expect(spy).toHaveBeenCalled();
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === true;
    });
    const result = (_tasks.length === taskService.tasks.length);
    console.log(result);
    expect(result).toBeTruthy();
  });

  it('call toggleAllTask with "false"', () => {
    taskService.tasks = tasks;
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.toggleAllTasks(false);
    expect(spy).toHaveBeenCalled();
    const _tasks =  taskService.tasks.filter((_task: Task) => {
      return _task.isCompleted === false;
    });
    const result = (_tasks.length === taskService.tasks.length);
    console.log(result);
    expect(result).toBeTruthy();
  });

  it('call removeTask', () => {
    taskService.tasks = tasks;
    const spy = spyOn(taskService, 'updateLocalStorage');
    taskService.removeTask(task);


    // const status = task.isCompleted;
    // taskService.toggleTask(task);
    expect(spy).toHaveBeenCalled();
    // expect(status).toBe(!task.isCompleted);
  });




});
