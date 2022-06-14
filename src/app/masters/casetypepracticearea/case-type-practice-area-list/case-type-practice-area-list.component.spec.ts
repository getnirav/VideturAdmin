import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTypePracticeAreaListComponent } from './case-type-practice-area-list.component';

describe('CaseTypePracticeAreaListComponent', () => {
  let component: CaseTypePracticeAreaListComponent;
  let fixture: ComponentFixture<CaseTypePracticeAreaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTypePracticeAreaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTypePracticeAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
