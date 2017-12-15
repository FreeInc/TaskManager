// @angular
import { TestBed } from '@angular/core/testing';

// services
import { WebService } from './web.service';

// models
import { TASKS } from '../models/storage';

describe('WebService', () => {

  let webService: WebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WebService ]
    });
    webService = TestBed.get(WebService);
  });

  it('call getTasks and return TASKS', () => {
    webService.getTasks().subscribe((data) => {
      expect(data).toEqual(TASKS);
    });
  });

});
