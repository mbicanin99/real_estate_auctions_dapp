import { Routes } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuctioneerDashboardComponent} from "./pages/auctioneer-dashboard/auctioneer-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auctioneer-dashboard',
    component: AuctioneerDashboardComponent
  }
  ]
