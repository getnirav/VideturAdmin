import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRolePermissionListComponent } from './admin-user-role-permission-list.component';

describe('AdminUserRolePermissionListComponent', () => {
  let component: AdminUserRolePermissionListComponent;
  let fixture: ComponentFixture<AdminUserRolePermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRolePermissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRolePermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
