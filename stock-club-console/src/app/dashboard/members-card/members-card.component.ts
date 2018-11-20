import { Component, OnInit } from '@angular/core';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { Member } from 'src/app/common/types';
import { MembersService } from 'src/app/services/members.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnInit {

  public members: Member[] = [];
  public selectedMemberId: string = '';

  constructor(private memberService: MembersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getMembers().subscribe((membersData: Member[]) => {
      this.members = membersData;
    });
  }

  public openAddMemberModal(): void {
    const dialogRef = this.dialog.open(AddMemberModalComponent, {
      width: '',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: string) => {
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
