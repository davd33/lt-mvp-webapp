import { TestBed, inject } from '@angular/core/testing';

import { DeleteUserService } from './delete-user.service';

describe('DeleteUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteUserService]
    });
  });

  it('should ...', inject([DeleteUserService], (service: DeleteUserService) => {
    expect(service).toBeTruthy();
  }));
});
