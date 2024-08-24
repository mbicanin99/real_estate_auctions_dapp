import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DescriptionPipes } from "../../../pipes/description.pipe";
import { RealEstateModalComponent } from "../real-estate-modal/real-estate-modal.component";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { ImageSliderComponent } from "../../../components/image-slider/image-slider.component";
import { Auction } from "../../../utils/types/auction.type";

@Component({
  selector: 'app-real-estate-card',
  standalone: true,
  imports: [
    DescriptionPipes,
    RealEstateModalComponent,
    NgIf,
    NgForOf,
    ImageSliderComponent,
    DatePipe
  ],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.css'
})
export class RealEstateCardComponent {
  @Input() auction!: Auction;
  @Input() showBidSection: boolean = true;
  @Output() editEvent = new EventEmitter<Auction>();
  isModalOpen = false;

  openModal() {
    if (this.auction) {
      this.isModalOpen = true;
    } else {
      console.error('Auction data is undefined');
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
