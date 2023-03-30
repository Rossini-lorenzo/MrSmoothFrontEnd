import { TestBed } from '@angular/core/testing';

import { AroundClientService } from './around-client.service';

describe('AroundClientService', () => {
  let service: AroundClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AroundClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
