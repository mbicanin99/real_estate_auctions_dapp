import { Injectable } from '@angular/core';
import UserRolesABI from '../../contracts/UserRoles.json';
import { MetaMaskService } from "../meta-mask-service/meta-mask.service";
import Web3 from "web3";

@Injectable({
  providedIn: 'root'
})

export class UserRoleService {
  private web3: Web3;
  private contract: any;
  private contractAddress = '0xF92F0Ed9fCb1960d51fBCe00fD95Be20d7f8699A';

  constructor(private metaMaskService: MetaMaskService) {
    this.web3 = new Web3(Web3.givenProvider || 'https://sepolia.infura.io/v3/476aa4688f0847f08c71a7f6c1c33961');
    this.contract = new this.web3.eth.Contract(UserRolesABI.abi, this.contractAddress);
  }

  async getCurrentUser(): Promise<{ address: string }> {
    const accounts = await this.metaMaskService.connectMetaMask();
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please connect MetaMask.');
    }
    return { address: accounts[0] };
  }

  async setRole(userAddress: string, role: number) {
    try {
      const accounts = await this.metaMaskService.connectMetaMask();
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect MetaMask.');
      }

      const fromAddress = accounts[0];
      const result = await this.contract.methods.setRole(userAddress, role).send({ from: fromAddress });
      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Error setting role:', error);
    }
  }

  async getRole(userAddress: string): Promise<number> {
    console.log(userAddress)
    return this.contract.methods.getRole(userAddress).call();
  }
}
