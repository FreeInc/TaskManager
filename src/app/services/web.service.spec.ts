import { TestBed, ComponentFixture } from '@angular/core/testing';

import { WebService } from './web.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Task } from '../entities/task';

import { TASKS } from '../entities/storage';

describe('WebService', () => {

  let webService: WebService;
  const task = {name: 'name', isCompleted: false};


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
    //webService.deleteTask(task); 
    const spy = spyOn(webService, 'deleteTask');
    webService.deleteTask(task);
    expect(spy).toHaveBeenCalledWith(task);
  });


  it('call getTasks and return TASKS', () => {
    webService.getTasks().subscribe((data) => {
      expect(data).toEqual(TASKS);
    });
  });

});
