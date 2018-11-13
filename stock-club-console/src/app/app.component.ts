import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Notification } from './common/types';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public transientNotification: Notification;
  public persistentNotification: Notification;

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService) {}

  public ngOnInit(): void {
    this.notificationService.getTransientNotifications().subscribe((notification: Notification) => {
      this.transientNotification = notification;
      if (notification) {
        setTimeout(() => {
          this.closeTransientNotification();
        }, notification.duration);
      }
    });
    this.notificationService.getPersistentNotifications().subscribe((notification: Notification) => {
      this.persistentNotification = notification;
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public closePersistentNotification(): void {
    this.persistentNotification = null;
    this.notificationService.closePersistentNotification();
  }

  public closeTransientNotification(): void {
    this.transientNotification = null;
    this.notificationService.closeTransientNotification();
  }
}


/*

Important Links:
  - Bootstrap 4 Components: https://getbootstrap.com/docs/4.1/components

TODO:
- need a way to add/delete friends
- need a way to enter stocks bought
- need a way to enter money per user
- need a way to take out available money per user
- need a way to vote on which stocks to buy
- need a way to log in
- need a way to logout
- need a way to create a stock club (initial setup)
- need a way to show alerts


- Initial screen: 
  - login
  - create new account

- After login: 
  - bring to dashboard
  - be able to add/delete stock club members (make it invite only to start)
  - be able to view money values (total, used, available, pending, growth/loss, etc) (stock club specific)
  - be able to enter more money (user specific)
  - be able to take out available money (user specific)
  - be able to propose a trade to stock club (question: what is the limit for trade proposals? (ex: 1 a day per group, infinite, etc.))
  - be able to vote on a proposed trade (default: need 100% yes to make trade)
  - be able to create new stock club (make it so you can only do this if you aren't in a stock club to start)

  - Creating a new stock club:
  - name club
  - add initial members 
*/