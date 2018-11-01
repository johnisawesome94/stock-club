import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public ngOnInit(): void {}

  public login(): void {
    this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(() => {
                    this.router.navigate(['/dashboard']);
                }, error => {
                    // TODO: handle error logging in
                });
  }
}
