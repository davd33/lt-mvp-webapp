/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovingFlagComponent } from './moving-flag.component';
import {TEST_MODULE} from '../conf.test';

describe('MovingFlagComponent', () => {
  let component: MovingFlagComponent;
  let fixture: ComponentFixture<MovingFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_MODULE)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
