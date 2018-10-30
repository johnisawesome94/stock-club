import { Component, OnInit } from '@angular/core';

interface Friend {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string
} 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalMoney: number;
  public availableMoney: number;
  public pendingMoney: number;
  public friends: Friend[];

  constructor() { }

  ngOnInit() {
    this.totalMoney = 100;
    this.availableMoney = 55; 
    this.pendingMoney = 23;
    this.friends = [{
      id: 'asdf1',
      firstName: 'John',
      lastName: 'Lundeen',
      username: 'john.lundeen',
      email: 'john.lundeen@email.com'
    }, {
      id: 'asdf12',
      firstName: 'Braxton',
      lastName: 'Kinner',
      username: 'braxton.kinner',
      email: 'braxton.kinner@email.com'
    },{
      id: 'asdf3',
      firstName: 'Alex',
      lastName: 'Peterson',
      username: 'alex.peterson',
      email: 'alex.peterson@email.com'
    },{
      id: 'asdf4',
      firstName: 'Troy',
      lastName: 'Sawtell',
      username: 'troy.sawtell',
      email: 'troy.sawtell@email.com'
    }];
  }
}
