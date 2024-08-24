import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from "@angular/common";
import { RealEstateCardComponent } from "./real-estate-card/real-estate-card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Auction } from "../../utils/types/auction.type";
import { AuctionFactoryService } from "../../services/old/auction-factory2";
import { MetaMaskService } from "../../services/meta-mask-service/meta-mask.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RealEstateCardComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public auctions: Auction[] = [];

  constructor(
    private auctionFactoryService: AuctionFactoryService,
    private metaMaskService: MetaMaskService
  ) {}

  async ngOnInit() {
    try {
      await this.metaMaskService.connectMetaMask();
      const auctionAddresses = await this.auctionFactoryService.getAllAuctionAddresses();
      this.auctions = await Promise.all(
        auctionAddresses.map(async (address: string) => {
          return await this.auctionFactoryService.getAuctionDetails(address);
        })
      );
    } catch (error) {
      console.error('Error loading auctions:', error);
    }
  }
}
