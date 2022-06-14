import { TestBed } from '@angular/core/testing';

import { AdminUserRolePermissionService } from './admin-user-role-permission.service';

describe('AdminUserRolePermissionService', () => {
  let service: AdminUserRolePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserRolePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
