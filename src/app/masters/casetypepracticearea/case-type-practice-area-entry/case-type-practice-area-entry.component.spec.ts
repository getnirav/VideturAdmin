import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTypePracticeAreaEntryComponent } from './case-type-practice-area-entry.component';

describe('CaseTypePracticeAreaEntryComponent', () => {
  let component: CaseTypePracticeAreaEntryComponent;
  let fixture: ComponentFixture<CaseTypePracticeAreaEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTypePracticeAreaEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTypePracticeAreaEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
