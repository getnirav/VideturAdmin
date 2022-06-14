import { TestBed } from '@angular/core/testing';

import { ImportExportDataService } from './import-export-data.service';

describe('ImportExportDataService', () => {
  let service: ImportExportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportExportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
