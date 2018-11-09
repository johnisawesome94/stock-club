import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { Member } from 'src/app/common/types';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnInit {

  public members: Member[] = [];
  public selectedMemberId: string = '';

  constructor(private modalService: NgbModal, private memberService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getMembers().subscribe((membersData: Member[]) => {
      this.members = membersData;
    });
  }

  public openAddMemberModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(AddMemberModalComponent);
    modalRef.result.then((result: string) => {
      console.log('add member modal closed: ' + result);
      if (result === 'add') {
        this.getMembers();
      }
    });
  }

  public deleteMember(): void {
    this.memberService.deleteMember(this.selectedMemberId).subscribe(() => {
      console.log('successfully deleted user with id ' + this.selectedMemberId);
    }, err => {
      console.log('failed to delete user with id ' + this.selectedMemberId);
    }, () => {
      this.getMembers();
    });
  }
}
