import { Component, OnInit } from '@angular/core';
import { Auction } from "../../utils/types/auction.type";
import { RealEstateModalComponent } from "../home/real-estate-modal/real-estate-modal.component";
import { RealEstateCardComponent } from "../home/real-estate-card/real-estate-card.component";
import { RealEstateAddModalComponent } from "./real-estate-add-modal/real-estate-add-modal.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { UserRoleService } from "../../services/user-role-service/user-role.service";
import { Roles } from "../../utils/enums/roles.enum";
import { AuctionFactoryService } from "../../services/auction-factory-service/auction-factory.service";
import { MetaMaskService } from "../../services/meta-mask-service/meta-mask.service";

@Component({
  selector: 'app-auctioneer-dashboard',
  standalone: true,
  imports: [
    RealEstateModalComponent,
    RealEstateCardComponent,
    NgIf,
    NgForOf,
    RealEstateAddModalComponent,
    NgClass
  ],
  templateUrl: './auctioneer-dashboard.component.html',
  styleUrls: ['./auctioneer-dashboard.component.css']
})
export class AuctioneerDashboardComponent implements OnInit {
  auctions: Auction[] = [];
  filteredAuctions: Auction[] = [];
  isModalOpen = false;
  selectedAuction: Auction | null = null;
  isAuctioneer = false;
  showConfirmationModal = false;
  activeButton: string = 'all';

  constructor(
    private auctionFactoryService: AuctionFactoryService,
    private userRoleService: UserRoleService,
    private metaMaskService: MetaMaskService
  ) {}

  async ngOnInit() {
    this.isAuctioneer = await this.checkIfAuctioneer();
    if (this.isAuctioneer) {
      await this.loadAllAuctions();
    } else {
      console.error('You do not have permission to access this dashboard.');
    }
  }

  private async checkIfAuctioneer(): Promise<boolean> {
    try {
      const currentUser = await this.userRoleService.getCurrentUser();
      const role = await this.userRoleService.getRole(currentUser.address);
      return role === Roles.Auctioneer;
    } catch (error) {
      console.error('Error checking if user is auctioneer:', error);
      return false;
    }
  }

  async loadAllAuctions() {
    try {
      this.auctions = await this.auctionFactoryService.getAllAuctions();
      this.filteredAuctions = this.auctions;
    } catch (error) {
      console.error('Error loading auctions:', error);
    }
  }

  async showAllProperties() {
    this.activeButton = "all";
    this.filteredAuctions = this.auctions;
  }

  async showOwnProperties() {
    this.activeButton = "own";
    const currentAccount = this.metaMaskService.account;

    this.filteredAuctions = this.auctions.filter(
      auction => auction.beneficiary.toLowerCase() === currentAccount.toLowerCase()
    );
  }

  openNewRealEstateModal() {
    this.activeButton = "new";
    this.selectedAuction = {
      auctionId: 0,
      auctionAddress: '',
      beneficiary: '',
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
    this.isModalOpen = true;
  }

  openEditRealEstateModal(auction: Auction) {
    this.selectedAuction = auction;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedAuction = null;
  }

  async handleSave(auction: Auction) {
    this.showConfirmationModal = true;

    setTimeout(() => {
      this.closeConfirmationModal();
    }, 3000);

    this.closeModal();
    try {
      const auctionStartTime = Math.floor(new Date(auction.auctionStartTime as string).getTime() / 1000);
      const auctionEndTime = Math.floor(new Date(auction.auctionEndTime as string).getTime() / 1000);

      await this.auctionFactoryService.createAuction(
        auctionStartTime,
        auctionEndTime,
        auction.beneficiary || this.metaMaskService.account,
        auction.realEstate.title,
        auction.realEstate.description,
        auction.realEstate.location,
        auction.realEstate.quadrature,
        auction.realEstate.images,
        auction.startingBid,
        auction.bidIncrement
      );

      await this.loadAllAuctions();
      this.closeModal();
    } catch (error) {
      console.error('Error saving auction:', error);
    }
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }
}
