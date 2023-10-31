import { TestBed } from '@angular/core/testing';

import { UrlConnectionService } from './url-connection.service';

describe('UrlConnectionService', () => {
  let service: UrlConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
