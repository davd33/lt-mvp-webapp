import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TEST_MODULE} from './conf.test';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(TEST_MODULE).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
