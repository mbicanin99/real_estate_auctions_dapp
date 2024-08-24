import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import RealEstateAuctionABI from '../../contracts/RealEstateAuction.json';
import { MetaMaskService } from "../meta-mask-service/meta-mask.service";

@Injectable({
  providedIn: 'root'
})
export class RealEstateAuctionService {
  private contract: any;
  private contractAddress: string = '0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3';

  constructor(
    private metaMaskService: MetaMaskService
  ) {
    this.initializeContract();
  }

  private initializeContract(): void {
    const web3 = this.metaMaskService.getWeb3();
    if (web3) {
      this.contract = new web3.eth.Contract(RealEstateAuctionABI.abi as AbiItem[], this.contractAddress);
    } else {
      console.error('Web3 instance not available. Ensure MetaMask is connected.');
    }
  }

  async bid(amount: number): Promise<void> {
    try {
      if (!this.metaMaskService.isConnected) {
        console.warn('MetaMask is not connected. Requesting connection...');
        await this.metaMaskService.connectMetaMask();
      }

      const account = this.metaMaskService.account;
      if (!account) {
        throw new Error('No account connected to MetaMask.');
      }

      const response = await this.contract.methods.bid().send({
        from: account,
        value: Web3.utils.toWei(amount.toString(), 'ether')
      });

      console.log('Bid Successful:', response);
    } catch (error) {
      console.error('Bid Error:', error);
      throw error;
    }
  }

  async withdraw(): Promise<boolean> {
    try {
      if (!this.metaMaskService.isConnected) {
        console.warn('MetaMask is not connected. Requesting connection...');
        await this.metaMaskService.connectMetaMask();
      }

      const account = this.metaMaskService.account;
      if (!account) {
        throw new Error('No account connected to MetaMask.');
      }

      const response = await this.contract.methods.withdraw().send({ from: account });
      console.log('Withdraw Successful:', response);
      return response.status;
    } catch (error) {
      console.error('Withdraw Error:', error);
      return false;
    }
  }

  async auctionEnd(): Promise<void> {
    try {
      if (!this.metaMaskService.isConnected) {
        console.warn('MetaMask is not connected. Requesting connection...');
        await this.metaMaskService.connectMetaMask();
      }

      const account = this.metaMaskService.account;
      if (!account) {
        throw new Error('No account connected to MetaMask.');
      }

      const response = await this.contract.methods.auctionEnd().send({ from: account });
      console.log('Auction Ended:', response);
    } catch (error) {
      console.error('Auction End Error:', error);
      throw error;
    }
  }

  async getRealEstateDetails(): Promise<any> {
    try {
      const details = await this.contract.methods.getRealEstateDetails().call();
      console.log('Real Estate Details:', details);
      return details;
    } catch (error) {
      console.error('Get Real Estate Details Error:', error);
      throw error;
    }
  }

  async getHighestBid(): Promise<number> {
    try {
      const highestBid = await this.contract.methods.highestBid().call();
      const highestBidInEther = Web3.utils.fromWei(highestBid, 'ether');
      console.log('Highest Bid:', highestBidInEther);
      return parseFloat(highestBidInEther);
    } catch (error) {
      console.error('Get Highest Bid Error:', error);
      throw error;
    }
  }

  async getHighestBidder(): Promise<string> {
    try {
      const highestBidder = await this.contract.methods.highestBidder().call();
      console.log('Highest Bidder:', highestBidder);
      return highestBidder;
    } catch (error) {
      console.error('Get Highest Bidder Error:', error);
      throw error;
    }
  }
}
