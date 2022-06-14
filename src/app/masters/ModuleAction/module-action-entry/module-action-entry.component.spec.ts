import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActionEntryComponent } from './module-action-entry.component';

describe('ModuleActionEntryComponent', () => {
  let component: ModuleActionEntryComponent;
  let fixture: ComponentFixture<ModuleActionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleActionEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
