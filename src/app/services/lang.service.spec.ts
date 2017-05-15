/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LangService } from './lang.service';
import {TEST_MODULE} from '../conf.test';

describe('LangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([LangService], (service: LangService) => {
    expect(service).toBeTruthy();
  }));
});
