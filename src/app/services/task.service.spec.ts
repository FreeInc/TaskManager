import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import {WebService} from './web.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, WebService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
