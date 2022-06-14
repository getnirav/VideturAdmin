import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceTypeEntryComponent } from './appearance-type-entry.component';

describe('AppearanceTypeEntryComponent', () => {
  let component: AppearanceTypeEntryComponent;
  let fixture: ComponentFixture<AppearanceTypeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppearanceTypeEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceTypeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
