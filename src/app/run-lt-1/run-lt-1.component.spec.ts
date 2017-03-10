/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RunLt1Component } from './run-lt-1.component';

describe('RunLt1Component', () => {
  let component: RunLt1Component;
  let fixture: ComponentFixture<RunLt1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunLt1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunLt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
