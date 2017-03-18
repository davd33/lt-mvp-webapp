/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovingFlagComponent } from './moving-flag.component';

describe('MovingFlagComponent', () => {
  let component: MovingFlagComponent;
  let fixture: ComponentFixture<MovingFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingFlagComponent ]
    })
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
