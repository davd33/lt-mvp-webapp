import { TestBed, inject } from '@angular/core/testing';

import { LtInputsService } from './lt-inputs.service';

describe('LtInputsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LtInputsService]
    });
  });

  it('should be created', inject([LtInputsService], (service: LtInputsService) => {
    expect(service).toBeTruthy();
  }));
});
