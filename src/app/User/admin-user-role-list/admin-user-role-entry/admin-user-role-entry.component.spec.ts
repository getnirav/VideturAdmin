import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRoleEntryComponent } from './admin-user-role-entry.component';

describe('AdminUserRoleEntryComponent', () => {
  let component: AdminUserRoleEntryComponent;
  let fixture: ComponentFixture<AdminUserRoleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRoleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRoleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
