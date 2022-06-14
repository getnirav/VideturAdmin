import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMasterListComponent } from './other-master-list.component';

describe('OtherMasterListComponent', () => {
  let component: OtherMasterListComponent;
  let fixture: ComponentFixture<OtherMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
