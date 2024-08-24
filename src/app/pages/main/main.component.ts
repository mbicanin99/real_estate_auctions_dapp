import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MetaMaskService } from "../../services/meta-mask-service/meta-mask.service";
import { RoleSelectionComponent } from "./role-selection/role-selection.component";
import { UserRoleService } from "../../services/user-role-service/user-role.service";
import { Roles } from "../../utils/enums/roles.enum";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RoleSelectionComponent,
    NgOptimizedImage
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showRoleSelection = false;
  metaMaskAccount: string = '';

  constructor(
    private metaMaskService: MetaMaskService,
    private router: Router,
    private userRoleService: UserRoleService) {}

  ngOnInit() {
    this.metaMaskService.setupWeb3Instance();
    this.metaMaskAccount = this.metaMaskService.account;
  }

  async connectMetaMask() {
    try {
      const accounts = await this.metaMaskService.connectMetaMask();
      if (accounts.length > 0) {
        this.metaMaskAccount = accounts[0];
        const role = await this.userRoleService.getRole(this.metaMaskAccount);
        if (role === Roles.Auctioneer) {
          await this.router.navigate(['/auctioneer-dashboard']);
        } else if (role === Roles.Bidder) {
          await this.router.navigate(['/home']);
        } else {
          this.showRoleSelection = true;
        }
      }
    } catch (error) {
      console.error('Error connecting to MetaMask or interacting with the contract:', error);
    }
  }

  async setRole(role: string) {
    try {
      const accounts = await this.metaMaskService.connectMetaMask();
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect MetaMask.');
      }

      const userAddress = accounts[0];
      const roleValue = role === 'Auctioneer' ? 1 : 2;

      await this.userRoleService.setRole(userAddress, roleValue);

      if (role === 'Auctioneer') {
        await this.router.navigate(['/auctioneer-dashboard']);
      } else {
        await this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error setting role or interacting with the contract:', error);
    }
  }
}
