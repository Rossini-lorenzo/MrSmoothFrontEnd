import { TestBed } from '@angular/core/testing';

import { AroundPromoteService } from './around-promote.service';

describe('AroundPromoteService', () => {
  let service: AroundPromoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AroundPromoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
