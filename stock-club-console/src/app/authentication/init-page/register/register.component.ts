import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { RegisterUser, NotificationTypes } from 'src/app/common/types';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: RegisterUser = new RegisterUser('', '', '', '');
  @Output() registered = new EventEmitter<void>();

  constructor(private router: Router, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  public ngOnInit(): void {}

  public registerUser(): void {
    this.authenticationService.registerUser(this.newUser).subscribe(() => {
      this.registered.emit();
    }, error => {
      this.notificationService.addNotification(NotificationTypes.Danger, 'Error: ' + error, false);
    });
  }

}
