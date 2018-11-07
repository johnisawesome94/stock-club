import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MembersService } from 'src/app/services/members.service';
import { Member, NewMember } from 'src/app/common/types';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {

  public newMember: NewMember = new NewMember('', '', '');

  constructor(public activeModal: NgbActiveModal, private membersService: MembersService) { }

  ngOnInit() {}

  public addMember(): void {
    this.membersService.addMember(this.newMember).subscribe(() => {
      // TODO: handle adding member success case
    }, () => {
      // TODO: handle adding member error case
    })
  }
}