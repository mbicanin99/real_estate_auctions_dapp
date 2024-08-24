import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CurrencyPipe, NgIf } from "@angular/common";
import { parseDateTimeString } from "../../helpers/data.helper";

@Component({
  selector: 'app-bidding-section',
  standalone: true,
  imports: [
    MatInput,
    MatButton,
    FormsModule,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './bidding-section.component.html',
  styleUrl: './bidding-section.component.css'
})
export class BiddingSectionComponent {
  @Input() highestBid: number | null = null;
  @Input() highestBidder: string | null = null;
  @Input() auctionEndDate: Date | string = '';
  @Input() bidError: string | null = null;
  @Output() emitBidEvent = new EventEmitter<number>();
  bidAmount: number | null = null;

  timeRemaining: string = '';
  intervalId: any;

  ngOnInit() {
    this.updateTimeRemaining();
    this.intervalId = setInterval(() => {
      this.updateTimeRemaining();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateTimeRemaining() {
    this.timeRemaining = this.calculateTimeLeft(this.auctionEndDate);
    if (this.timeRemaining === "Auction ended") {
      this.bidError = 'The auction has ended.';
    }
  }

  calculateTimeLeft(endTime: Date | string): string {
    if (typeof endTime === 'string') {
      endTime = parseDateTimeString(endTime);
    }

    const currentTime = Math.floor(Date.now() / 1000);

    const auctionEndTime = Math.floor(new Date(endTime).getTime() / 1000);
    const timeLeftInSeconds = auctionEndTime - currentTime;
    if (timeLeftInSeconds > 0) {
      const hours = Math.floor(timeLeftInSeconds / 3600);
      const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
      const seconds = timeLeftInSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "Auction ended";
    }
  }

  onBid() {
    if (this.bidAmount !== null) {
      this.emitBidEvent.emit(this.bidAmount);
    }
  }
}
