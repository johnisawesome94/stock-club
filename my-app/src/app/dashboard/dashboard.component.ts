import { Component, OnInit } from '@angular/core';
import { Friend, Money } from '../common/types';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalMoney: number;
  public availableMoney: number;
  public pendingMoney: number;
  public usedMoney: number;
  public friends: Friend[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getFriends().subscribe((friendsData: Friend[]) => {
      this.friends = friendsData;
    });
    this.dashboardService.getMoney().subscribe((moneyData: Money) => {
      this.totalMoney = moneyData.total;
      this.availableMoney = moneyData.available;
      this.pendingMoney = moneyData.pending;
      this.usedMoney = moneyData.used;
    });   
  }
}
