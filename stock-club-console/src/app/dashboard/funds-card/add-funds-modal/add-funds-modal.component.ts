import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FundsService } from 'src/app/services/funds.service';

@Component({
  selector: 'app-add-funds-modal',
  templateUrl: './add-funds-modal.component.html',
  styleUrls: ['./add-funds-modal.component.scss']
})
export class AddFundsModalComponent implements OnInit {

  public contribution: string = '';

  constructor(public activeModal: NgbActiveModal, private fundsService: FundsService) { }

  ngOnInit() {
  }

  public addFunds(): void {
    this.fundsService.postFunds(this.contribution).subscribe(() => {
      // TODO: handle adding funds success case
      console.log('Added funds successfully');
    }, () => {
      // TODO: handle adding funds error case
      console.log('Funds not added successully');
    });
  }
}
