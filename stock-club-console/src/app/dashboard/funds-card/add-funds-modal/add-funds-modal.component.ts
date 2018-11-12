import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FundsService } from 'src/app/services/funds.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationTypes } from 'src/app/common/types';

@Component({
  selector: 'app-add-funds-modal',
  templateUrl: './add-funds-modal.component.html',
  styleUrls: ['./add-funds-modal.component.scss']
})
export class AddFundsModalComponent implements OnInit {

  public contribution: string = '';

  constructor(public activeModal: NgbActiveModal, private fundsService: FundsService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  public addFunds(): void {
    this.fundsService.postFunds(this.contribution).subscribe(() => {
      // TODO: handle adding funds success case
      console.log('Added funds successfully');
      this.notificationService.addNotification(NotificationTypes.Success, 'Successfully added funds', true);
    }, () => {
      // TODO: handle adding funds error case
      this.notificationService.addNotification(NotificationTypes.Danger, 'Failed to add funds', true);
      console.log('Funds not added successully');
    }, () => {
      this.activeModal.close('add');
    });
  }
}
