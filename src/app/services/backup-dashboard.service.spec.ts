import { TestBed } from '@angular/core/testing';

import { BackupDashboardService } from './backup-dashboard.service';

describe('BackupDashboardService', () => {
  let service: BackupDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackupDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
