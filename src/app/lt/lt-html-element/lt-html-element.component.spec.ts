import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtHtmlElementComponent } from './lt-html-element.component';

describe('LtHtmlElementComponent', () => {
  let component: LtHtmlElementComponent;
  let fixture: ComponentFixture<LtHtmlElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtHtmlElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtHtmlElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
