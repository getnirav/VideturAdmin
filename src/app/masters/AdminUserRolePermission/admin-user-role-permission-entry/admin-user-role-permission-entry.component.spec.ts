import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRolePermissionEntryComponent } from './admin-user-role-permission-entry.component';

describe('AdminUserRolePermissionEntryComponent', () => {
  let component: AdminUserRolePermissionEntryComponent;
  let fixture: ComponentFixture<AdminUserRolePermissionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRolePermissionEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRolePermissionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
