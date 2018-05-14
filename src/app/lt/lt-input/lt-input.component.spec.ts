import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtInputComponent } from './lt-input.component';

describe('LtInputComponent', () => {
  let component: LtInputComponent;
  let fixture: ComponentFixture<LtInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
