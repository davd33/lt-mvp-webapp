/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LtService } from './lt.service';
import {TEST_MODULE} from '../conf.test';

describe('LtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([LtService], (service: LtService) => {
    expect(service).toBeTruthy();
  }));
});
