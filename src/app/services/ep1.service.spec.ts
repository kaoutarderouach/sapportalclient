import { TestBed } from '@angular/core/testing';

import { Ep1Service } from './ep1.service';

describe('Ep1Service', () => {
  let service: Ep1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ep1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
