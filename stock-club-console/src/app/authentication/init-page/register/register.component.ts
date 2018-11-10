import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { RegisterUser } from 'src/app/common/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: RegisterUser = new RegisterUser('', '', '', '');
  @Output() registered = new EventEmitter<void>();

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public ngOnInit(): void {}

  public registerUser(): void {
    this.authenticationService.registerUser(this.newUser).subscribe(() => {
      this.registered.emit();
    }, error => {
      // TODO: handle error logging in
    });
  }

}
