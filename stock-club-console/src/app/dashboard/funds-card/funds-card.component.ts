import { Component, OnInit } from '@angular/core';
import { Funds } from 'src/app/common/types';
import { FundsService } from 'src/app/services/funds.service';

@Component({
  selector: 'funds-card',
  templateUrl: './funds-card.component.html',
  styleUrls: ['./funds-card.component.scss']
})
export class FundsCardComponent implements OnInit {

  public totalMoney: number;
  public availableMoney: number;
  public pendingMoney: number;
  public usedMoney: number;

  constructor(private fundsService: FundsService) { }

  ngOnInit() {
    this.fundsService.getFunds().subscribe((fundData: Funds) => {
      this.totalMoney = fundData.total;
      this.availableMoney = fundData.available;
      this.pendingMoney = fundData.pending;
      this.usedMoney = fundData.used;
    });   
  }

}
