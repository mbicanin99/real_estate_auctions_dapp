import { Injectable } from '@angular/core';
import {Web3} from "web3";

@Injectable({
  providedIn: 'root'
})
export class MetaMaskService {
  private web3: Web3 | undefined;
  public isConnected = false;
  public account: string = '';

  constructor() {
    this.setupWeb3Instance();
  }

  setupWeb3Instance() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.checkMetaMaskConnection();
    } else {
      console.warn('MetaMask not detected. Please install MetaMask and try again.');
    }
  }

  async checkMetaMaskConnection() {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          this.account = accounts[0];
          this.isConnected = true;
        } else {
          console.log('No accounts found. Please connect MetaMask.');
        }
      } else {
        console.warn('MetaMask not detected. Please install MetaMask and try again.');
      }
    } catch (error) {
      console.error('Error checking MetaMask connection:', error);
    }
  }

  async connectMetaMask(): Promise<string[]> {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
        this.isConnected = true;
        return accounts;
      } else {
        alert('MetaMask not detected. Please install MetaMask and try again.');
        return [];
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return [];
    }
  }

  getWeb3() {
    return this.web3;
  }
}
