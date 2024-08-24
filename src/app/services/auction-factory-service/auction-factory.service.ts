import { Injectable } from '@angular/core';
import { AbiItem } from 'web3-utils';
import AuctionFactoryABI from '../../contracts/RealEstateAuctionFactory.json';
import { MetaMaskService } from '../meta-mask-service/meta-mask.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionFactoryService {
  private contract: any;
  private contractAddress: string = "0x4022A61875bF2223E4b7AE6Fb87B3AD5d3975EAe";

  constructor(private metaMaskService: MetaMaskService) {
    this.initializeContract();
  }

  initializeContract(): void {
    const web3 = this.metaMaskService.getWeb3();
    if (web3) {
      this.contract = new web3.eth.Contract(AuctionFactoryABI.abi as AbiItem[], this.contractAddress);
    } else {
      console.error('Web3 instance not available. Ensure MetaMask is connected.');
    }
  }

  async createAuction(
    auctionStartTime: number,
    auctionEndTime: number,
    beneficiary: string,
    title: string,
    description: string,
    location: string,
    quadrature: number,
    images: string[],
    startingBid: number,
    bidIncrement: number
  ): Promise<void> {
    try {
      if (!this.metaMaskService.isConnected) {
        console.warn('MetaMask is not connected. Requesting connection...');
        await this.metaMaskService.connectMetaMask();
      }

      const account = this.metaMaskService.account;
      if (!account) {
        throw new Error('No account connected to MetaMask.');
      }

      const web3 = this.metaMaskService.getWeb3();
      if (!web3) {
        throw new Error('Web3 instance not available. Ensure MetaMask is connected.');
      }

      const transactionParameters = {
        to: this.contractAddress,
        from: account,
        data: this.contract.methods.createAuction(
          auctionStartTime,
          auctionEndTime,
          beneficiary,
          title,
          description,
          location,
          quadrature,
          images,
          startingBid,
          bidIncrement
        ).encodeABI(),
        gas: '1000000'
      };

      const txHash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      console.log('Transaction Hash:', txHash);

      this.contract.events.AuctionCreated({
        filter: { creator: account },
        fromBlock: 'latest'
      })
        .on('data', (event: any) => {
          console.log('AuctionCreated event received:', event);
        })
        .on('error', (error: any) => {
          console.error('Error in event listener:', error);
        });
    } catch (error) {
      console.error('Error creating auction:', error);
      throw error;
    }
  }

  async getAllAuctionAddresses(): Promise<string[]> {
    try {
      return await this.contract.methods.getAllAuctions().call();
    } catch (error) {
      console.error('Error retrieving auctions:', error);
      throw error;
    }
  }

  async getAuctionDetails(auctionAddress: string): Promise<any> {
    try {
      const web3 = this.metaMaskService.getWeb3();
      if (!web3) {
        throw new Error('Web3 instance not available. Ensure MetaMask is connected.');
      }

      const result = await this.contract.methods.getAuctionDetails(auctionAddress).call();

      return {
        auctionId: Number(result[0]),
        beneficiary: result[1],
        title: result[2],
        description: result[3],
        location: result[4],
        quadrature: Number(result[5]),
        images: result[6],
        startingBid: Number(result[7]),
        bidIncrement: Number(result[8]),
        highestBidder: result[9],
        highestBid: Number(result[10]),
        ended: result[11]
      };
    } catch (error) {
      console.error('Error retrieving auction details:', error);
      throw error;
    }
  }

  async getAllAuctions(): Promise<any[]> {
    try {
      const auctionAddresses = await this.getAllAuctionAddresses();
      return await Promise.all(auctionAddresses.map(async (address: string) => {
        return await this.getAuctionDetails(address);
      }));
    } catch (error) {
      console.error('Error retrieving all auctions:', error);
      throw error;
    }
  }
}
