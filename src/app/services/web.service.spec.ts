import { TestBed, inject } from '@angular/core/testing';

import { WebService } from './web.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('WebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([WebService], (service: WebService) => {
    expect(service).toBeTruthy();
  }));
});
