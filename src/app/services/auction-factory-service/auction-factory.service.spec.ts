import { TestBed } from '@angular/core/testing';

import { AuctionFactoryServiceService } from './auction-factory.service';

describe('AuctionFactoryServiceService', () => {
  let service: AuctionFactoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionFactoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
