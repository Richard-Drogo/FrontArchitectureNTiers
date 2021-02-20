import { TestBed } from '@angular/core/testing';

import { BingMapsLoaderService } from './bing-maps-loader.service';

describe('BingMapsLoaderService', () => {
  let service: BingMapsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingMapsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
