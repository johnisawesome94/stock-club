import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationTypes } from 'src/app/common/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  public ngOnInit(): void {}

  public login(): void {
    this.authenticationService
    .login(this.username, this.password)
    .pipe(first())
    .subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, error => {
      this.notificationService.addNotification(NotificationTypes.Danger, 'Error: ' + error, false);
    });
  }
}
