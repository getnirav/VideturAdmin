/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CountryEntryComponent } from './country-entry.component';

describe('CountryEntryComponent', () => {
  let component: CountryEntryComponent;
  let fixture: ComponentFixture<CountryEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
