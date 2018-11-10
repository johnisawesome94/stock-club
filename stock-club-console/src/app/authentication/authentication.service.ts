import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, RegisterUser } from '../common/types';
import { Router } from '@angular/router';
import { RestConstants } from '../common/constants/rest';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(email: string, password: string): Observable<any> {
        return this.http.post<any>(RestConstants.LOGIN_URL, { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.auth_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    public logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    public registerUser(newUser: RegisterUser): Observable<any> {
        return this.http.post<any>(RestConstants.REGISTER_URL, newUser);
    }
}