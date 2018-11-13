import { Injectable } from '@angular/core';
import { Funds } from '../common/types';
import { RestConstants } from '../common/constants/rest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  public getFunds(): Observable<Funds> {
    return this.httpClient.get<Funds>(RestConstants.FUNDS_URL);
  }

  public getLoggedInUsersFunds(): Observable<Funds> {
    return this.httpClient.get<Funds>(`${RestConstants.FUNDS_URL}/${this.authenticationService.getLoggedInUsersId()}`);
  }

  public postFunds(contribution: string): Observable<any> {
    return this.httpClient.post<string>(RestConstants.FUNDS_URL, {userId: this.authenticationService.getLoggedInUsersId(), amount: contribution });
  }
}
