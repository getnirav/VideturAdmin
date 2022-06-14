import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRoleListComponent } from './admin-user-role-list.component';

describe('AdminUserRoleListComponent', () => {
  let component: AdminUserRoleListComponent;
  let fixture: ComponentFixture<AdminUserRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserRoleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
