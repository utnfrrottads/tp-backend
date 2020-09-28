import { TestBed } from '@angular/core/testing';

import { WebSdkServicesService } from './web-sdk-services.service';

describe('WebSdkServicesService', () => {
  let service: WebSdkServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSdkServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
