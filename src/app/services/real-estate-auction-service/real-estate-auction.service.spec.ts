import { TestBed } from '@angular/core/testing';

import { RealEstateAuctionService } from './real-estate-auction.service';

describe('RealEstateAuctionService', () => {
  let service: RealEstateAuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealEstateAuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
