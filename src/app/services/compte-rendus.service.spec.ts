import { TestBed } from '@angular/core/testing';

import { CompteRendusService } from './compte-rendus.service';

describe('CompteRendusService', () => {
  let service: CompteRendusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteRendusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
