import { TestBed } from '@angular/core/testing';

import { TripleService } from './triple.service';

describe('TripleService', () => {
  let service: TripleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
