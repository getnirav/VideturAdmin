import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceTypeListComponent } from './appearance-type-list.component';

describe('AppearanceTypeListComponent', () => {
  let component: AppearanceTypeListComponent;
  let fixture: ComponentFixture<AppearanceTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppearanceTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
