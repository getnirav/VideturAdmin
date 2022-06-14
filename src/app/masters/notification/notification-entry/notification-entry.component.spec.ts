import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEntryComponent } from './notification-entry.component';

describe('NotificationEntryComponent', () => {
  let component: NotificationEntryComponent;
  let fixture: ComponentFixture<NotificationEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
