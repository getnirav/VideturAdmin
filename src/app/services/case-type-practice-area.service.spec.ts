import { TestBed } from '@angular/core/testing';

import { CaseTypePracticeAreaService } from './case-type-practice-area.service';

describe('CaseTypePracticeAreaService', () => {
  let service: CaseTypePracticeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseTypePracticeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
