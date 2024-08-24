import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Auction } from "../../../utils/types/auction.type";

@Component({
  selector: 'app-real-estate-add-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './real-estate-add-modal.component.html',
  styleUrls: ['./real-estate-add-modal.component.css']
})
export class RealEstateAddModalComponent {
  @Input() auction: Auction = {
    auctionId: 0,
    auctionAddress: '',
    beneficiary: '0xD3a87FBd2BFa1160C0Bd3538e58F36640007238D',
    auctionStartTime: '',
    auctionEndTime: '',
    highestBidder: '',
    highestBid: 0,
    startingBid: 0,
    bidIncrement: 0,
    ended: false,
    realEstate: {
      id: 0,
      title: '',
      description: '',
      location: '',
      quadrature: 0,
      images: [],
      ownerWalletAddress: ''
    },
    pendingReturns: {},
    secretMessage: ''
  };

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Auction>();

  imagesString: string = '';

  ngOnInit() {
    this.imagesString = this.auction.realEstate.images.join(', ');
  }

  save() {
    this.auction.realEstate.images = this.imagesString.split(',').map(url => url.trim());
    this.saveEvent.emit(this.auction);
  }

  close() {
    this.closeModalEvent.emit();
  }
}
