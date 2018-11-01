import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private memberService: MembersService) { }

  ngOnInit() {
    this.memberService.getMembers().subscribe((membersData: Member[]) => {
      this.members = membersData;
    });
  }

  public openAddMemberModal(): void {
    const modalRef = this.modalService.open(AddMemberModalComponent);
    modalRef.componentInstance.name = 'World';
  }

}
