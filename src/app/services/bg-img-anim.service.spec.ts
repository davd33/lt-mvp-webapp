/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BgImgAnimService } from './bg-img-anim.service';
import {TEST_MODULE} from '../conf.test';

describe('BgImgAnimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([BgImgAnimService], (service: BgImgAnimService) => {
    expect(service).toBeTruthy();
  }));
});
