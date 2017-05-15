/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignUpService } from './sign-up.service';
import {TEST_MODULE} from '../conf.test';

describe('SignUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([SignUpService], (service: SignUpService) => {
    expect(service).toBeTruthy();
  }));
});
