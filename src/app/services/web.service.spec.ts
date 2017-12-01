import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { WebService } from './web.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Task } from '../entities/task';

import { TASKS } from '../entities/storage';

xdescribe('WebService', () => {

  let webService: WebService;


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


  // it('should be created', inject([WebService], () => {
  //   expect(this.webService).toBeTruthy();
  // }));

/*
  it('call deleteTask with param task', () => {
    const result = spyOn(webService, 'deleteTask');
    webService.deleteTask(this.task);
    expect(result).toHaveBeenCalledWith(this.task);
  });
*/

  it('call getTasks and return TASKS', () => {
    webService.getTasks().subscribe((data) => {
      expect(data).toEqual(TASKS);
    });
  });

});
