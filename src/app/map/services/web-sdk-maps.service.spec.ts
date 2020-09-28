import { TestBed } from '@angular/core/testing';

import { WebSdkMapsService } from './web-sdk-maps.service';

describe('WebSdkMapsService', () => {
  let service: WebSdkMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSdkMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
