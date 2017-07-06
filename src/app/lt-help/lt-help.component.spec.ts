import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtHelpComponent } from './lt-help.component';

describe('LtHelpComponent', () => {
  let component: LtHelpComponent;
  let fixture: ComponentFixture<LtHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
