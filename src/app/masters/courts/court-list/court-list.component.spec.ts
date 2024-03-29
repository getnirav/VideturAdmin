/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CourtListComponent } from './court-list.component';

describe('CourtListComponent', () => {
  let component: CourtListComponent;
  let fixture: ComponentFixture<CourtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
