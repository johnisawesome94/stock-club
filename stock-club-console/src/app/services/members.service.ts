import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member, NewMember } from '../common/types';
import { RestConstants } from '../common/constants/rest';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private httpClient: HttpClient) { }

  public getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(RestConstants.MEMBERS_URL);
  }

  public postMember(newMember: NewMember): Observable<Member> {
    return this.httpClient.post<Member>(RestConstants.MEMBERS_URL, newMember);
  }

  public deleteMember(memberId: string): Observable<any> {
    return this.httpClient.delete(`${RestConstants.MEMBERS_URL}/${memberId}`, { responseType: 'text' });
  }
}
