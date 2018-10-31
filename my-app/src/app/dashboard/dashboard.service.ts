import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConstants } from '../common/constants/rest';
import { Observable } from 'rxjs';
import { Friend, Money } from '../common/types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {}

  public getFriends(): Observable<Friend[]> {
    return this.httpClient.get<Friend[]>(RestConstants.FRIENDS_URL);
  }

  public getMoney(): Observable<Money> {
    return this.httpClient.get<Money>(RestConstants.MONEY_URL);
  }
}
