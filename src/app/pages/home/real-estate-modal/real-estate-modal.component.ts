import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { ImageSliderComponent } from "../../../components/image-slider/image-slider.component";
import { BiddingSectionComponent } from "../../../components/bidding-section/bidding-section.component";
import { Auction } from "../../../utils/types/auction.type";
import {RealEstateAuctionService} from "../../../services/real-estate-auction-service/real-estate-auction.service";

@Component({
  selector: 'app-real-estate-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    FormsModule,
    MatFormField,
    MatInput,
    NgOptimizedImage,
    NgIf,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    ImageSliderComponent,
    BiddingSectionComponent
  ],
  templateUrl: './real-estate-modal.component.html',
  styleUrl: './real-estate-modal.component.css'
})
export class RealEstateModalComponent {
  @Input() auction!: Auction;
  @Input() showBidSection: boolean = true;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Auction>();

  highestBid: number = 0;
  highestBidder: string = '';
  bidError: string | null = null;

  constructor(private realEstateAuctionService: RealEstateAuctionService) {}

  async ngOnInit() {
    try {
      if (this.auction) {
        this.highestBid = await this.realEstateAuctionService.getHighestBid();
        this.highestBidder = await this.realEstateAuctionService.getHighestBidder();
      } else {
        console.error('Auction data is undefined');
      }
    } catch (error) {
      console.error('Error loading auction data:', error);
    }
  }

  get isAuctionStarted(): boolean {
    const now = new Date();
    return now >= new Date(this.auction.auctionStartTime);
  }

  get isAuctionEnded(): boolean {
    const now = new Date();
    return now >= new Date(this.auction.auctionEndTime);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  async onBid(bidAmount: number) {
    const requiredBid = this.highestBid + this.auction.bidIncrement;
    if (bidAmount >= requiredBid) {
      try {
        await this.realEstateAuctionService.bid(bidAmount);
        this.highestBid = bidAmount;
        this.highestBidder = await this.realEstateAuctionService.getHighestBidder();
        this.bidError = null;
      } catch (error) {
        console.error('Error placing bid:', error);
        this.bidError = 'Failed to place bid. Please try again.';
      }
    } else {
      this.bidError = `Your bid must be at least ${requiredBid} EUR (current highest bid plus the bid increment).`;
    }
  }
}
