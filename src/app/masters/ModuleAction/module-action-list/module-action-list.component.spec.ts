import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActionListComponent } from './module-action-list.component';

describe('ModuleActionListComponent', () => {
  let component: ModuleActionListComponent;
  let fixture: ComponentFixture<ModuleActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleActionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
