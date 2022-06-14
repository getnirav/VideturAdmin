import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApperanceViewComponent } from './apperance-view.component';

describe('ApperanceViewComponent', () => {
  let component: ApperanceViewComponent;
  let fixture: ComponentFixture<ApperanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApperanceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApperanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
