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

  public totalMoney: number;
  public availableMoney: number;
  public pendingMoney: number;
  public usedMoney: number;

  constructor(private fundsService: FundsService, private modalService: NgbModal) { }

  ngOnInit() {
      this.getFunds();
  }

  public getFunds(): void {
    this.fundsService.getFunds().subscribe((fundData: Funds) => {
      this.totalMoney = fundData.total;
      this.availableMoney = fundData.available;
      this.pendingMoney = fundData.pending;
      this.usedMoney = fundData.used;
    }); 
  }

  public openAddFundsModal(): void {
    console.log("button clicked");
    const modalRef: NgbModalRef = this.modalService.open(AddFundsModalComponent)
    modalRef.result.then((result: string) => {
      if (result === 'add') {
        this.getFunds();
      }
    })
  }

}
