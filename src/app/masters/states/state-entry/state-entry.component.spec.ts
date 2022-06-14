/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StateEntryComponent } from './state-entry.component';

describe('StateEntryComponent', () => {
  let component: StateEntryComponent;
  let fixture: ComponentFixture<StateEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
