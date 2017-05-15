/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecaptchaService } from './recaptcha.service';
import {TEST_MODULE} from '../conf.test';

describe('RecaptchaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([RecaptchaService], (service: RecaptchaService) => {
    expect(service).toBeTruthy();
  }));
});
