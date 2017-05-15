import { TestBed, inject } from '@angular/core/testing';

import { DeleteUserService } from './delete-user.service';
import {TEST_MODULE} from '../conf.test';

describe('DeleteUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TEST_MODULE);
  });

  it('should ...', inject([DeleteUserService], (service: DeleteUserService) => {
    expect(service).toBeTruthy();
  }));
});
