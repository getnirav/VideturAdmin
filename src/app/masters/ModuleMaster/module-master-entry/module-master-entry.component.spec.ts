import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMasterEntryComponent } from './module-master-entry.component';

describe('ModuleMasterEntryComponent', () => {
  let component: ModuleMasterEntryComponent;
  let fixture: ComponentFixture<ModuleMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleMasterEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
