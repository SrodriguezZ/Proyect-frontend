import { TestBed } from '@angular/core/testing';

import { FactservService } from './factserv.service';

describe('FactservService', () => {
  let service: FactservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
