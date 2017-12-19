import { TestBed } from '@angular/core/testing';

import { WebService } from './web.service';
import { TASKS } from '../models/storage';

describe('WebService', () => {

  let webService: WebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WebService ]
    });
    webService = TestBed.get(WebService);
  });

  it('function cally getTasks() => return TASKS', () => {
    webService.getTasks().subscribe((data) => {
      expect(data).toEqual(TASKS);
    });
  });

});
