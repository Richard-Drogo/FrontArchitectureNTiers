import { TestBed } from '@angular/core/testing';

import { BingMapService } from './bing-map.service';

describe('BingMapService', () => {
  let service: BingMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
