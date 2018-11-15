import { Component, OnInit } from '@angular/core';
import { Funds } from 'src/app/common/types';
import { FundsService } from 'src/app/services/funds.service';
import { AddFundsModalComponent } from './add-funds-modal/add-funds-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'funds-card',
  templateUrl: './funds-card.component.html',
  styleUrls: ['./funds-card.component.scss']
})
export class FundsCardComponent implements OnInit {

  public stockClubFunds: Funds = new Funds(0, 0, 0, 0);
  public personalFunds: Funds = new Funds(0, 0, 0, 0);

  constructor(private fundsService: FundsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getFunds();
    this.getPersonalFunds();
  }

  public getFunds(): void {
    this.fundsService.getFunds().subscribe((fundData: Funds) => {
      this.stockClubFunds = fundData;
    }); 
  }

  public getPersonalFunds(): void {
    this.fundsService.getLoggedInUsersFunds().subscribe((fundData: Funds) => {
      this.personalFunds = fundData;
    }); 
  }

  public openAddFundsModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(AddFundsModalComponent)
    modalRef.result.then((result: string) => {
      if (result === 'add') {
        this.getFunds();
        this.getPersonalFunds();
      }
    })
  }
}
