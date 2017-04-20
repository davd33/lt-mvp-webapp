/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BgImgAnimService } from './bg-img-anim.service';

describe('BgImgAnimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BgImgAnimService]
    });
  });

  it('should ...', inject([BgImgAnimService], (service: BgImgAnimService) => {
    expect(service).toBeTruthy();
  }));
});
