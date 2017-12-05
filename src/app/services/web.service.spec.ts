import { TestBed, ComponentFixture } from '@angular/core/testing';

import { WebService } from './web.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Task } from '../entities/task';

import { TASKS } from '../entities/storage';

describe('WebService', () => {

  let webService: WebService;
  const task = {name: 'name', isCompleted: false};

  const tasks = [
    {name: 'name1', isCompleted: false},
    {name: 'name2', isCompleted: false}
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WebService, HttpClient, HttpHandler ]
    });

    webService = TestBed.get(WebService);
/*
    const TASKS = [
      { name: 'Learn Angular 5', isCompleted: true },
      { name: 'Kill them all', isCompleted: false }
    ];
*/
  });


  it('call deleteTask with param task', () => {
    const spy = spyOn(webService, 'deleteTask').and.callThrough();
    webService.deleteTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call updateTask with param task', () => {
    const spy = spyOn(webService, 'updateTask').and.callThrough();
    webService.updateTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call addTask with param task', () => {
    const spy = spyOn(webService, 'addTask').and.callThrough();
    webService.addTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('call deleteTasks with param tasks', () => {
    const spy = spyOn(webService, 'deleteTasks').and.callThrough();
    webService.deleteTasks(tasks);
    expect(spy).toHaveBeenCalledWith(tasks);
  });

  it('call getTasks and return TASKS', () => {
    webService.getTasks().subscribe((data) => {
      expect(data).toEqual(TASKS);
    });
  });

});
