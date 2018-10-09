import { TestBed, inject } from '@angular/core/testing';

import { Interceptor401Service } from './interceptor401.service';

describe('Interceptor401Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Interceptor401Service]
    });
  });

  it('should be created', inject([Interceptor401Service], (service: Interceptor401Service) => {
    expect(service).toBeTruthy();
  }));
});
