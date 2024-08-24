import { RealEstate } from "./real-estate.type";

export interface Auction {
  auctionId: number;
  auctionAddress: string;
  beneficiary: string;
  auctionStartTime: Date | string;
  auctionEndTime: Date | string;
  highestBidder: string;
  highestBid: number;
  startingBid: number;
  bidIncrement: number;
  ended: boolean;
  realEstate: RealEstate;
  pendingReturns?: Record<string, number>;
  secretMessage?: string
}
