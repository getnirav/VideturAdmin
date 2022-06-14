/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CountyEntryComponent } from './county-entry.component';

describe('CountyEntryComponent', () => {
  let component: CountyEntryComponent;
  let fixture: ComponentFixture<CountyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountyEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
