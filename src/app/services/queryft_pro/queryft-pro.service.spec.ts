import { TestBed } from '@angular/core/testing';

import { QueryftProService } from './queryft-pro.service';

describe('QueryftProService', () => {
  let service: QueryftProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryftProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
