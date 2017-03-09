/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LtService } from './lt.service';

describe('LtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LtService]
    });
  });

  it('should ...', inject([LtService], (service: LtService) => {
    expect(service).toBeTruthy();
  }));
});
