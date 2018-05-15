import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtWordComponent } from './lt-word.component';

describe('LtWordComponent', () => {
  let component: LtWordComponent;
  let fixture: ComponentFixture<LtWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
