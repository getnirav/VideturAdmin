/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CityEntryComponent } from './city-entry.component';

describe('CityEntryComponent', () => {
  let component: CityEntryComponent;
  let fixture: ComponentFixture<CityEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
