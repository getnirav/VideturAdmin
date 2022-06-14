import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEntryComponent } from './admin-user-entry.component';

describe('AdminUserEntryComponent', () => {
  let component: AdminUserEntryComponent;
  let fixture: ComponentFixture<AdminUserEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
