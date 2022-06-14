import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMasterEntryComponent } from './other-master-entry.component';

describe('OtherMasterEntryComponent', () => {
  let component: OtherMasterEntryComponent;
  let fixture: ComponentFixture<OtherMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMasterEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
