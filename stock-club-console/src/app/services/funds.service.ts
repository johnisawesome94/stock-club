import { Injectable } from '@angular/core';
import { Funds } from '../common/types';
import { RestConstants } from '../common/constants/rest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(private httpClient: HttpClient) { }

  public getFunds(): Observable<Funds> {
    return this.httpClient.get<Funds>(RestConstants.FUNDS_URL);
  }
}
