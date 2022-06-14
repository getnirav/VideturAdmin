import { TestBed } from '@angular/core/testing';

import { AppearanceTypeService } from './appearance-type.service';

describe('AppearanceTypeService', () => {
  let service: AppearanceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppearanceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
