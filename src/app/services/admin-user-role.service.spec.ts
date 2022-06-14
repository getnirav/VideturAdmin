import { TestBed } from '@angular/core/testing';

import { AdminUserRoleService } from './admin-user-role.service';

describe('AdminUserRoleService', () => {
  let service: AdminUserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
