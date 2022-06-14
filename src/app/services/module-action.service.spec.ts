import { TestBed } from '@angular/core/testing';

import { ModuleActionService } from './module-action.service';

describe('ModuleActionService', () => {
  let service: ModuleActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
