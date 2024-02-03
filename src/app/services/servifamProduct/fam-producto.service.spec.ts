import { TestBed } from '@angular/core/testing';

import { FamProductoService } from './fam-producto.service';

describe('FamProductoService', () => {
  let service: FamProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
