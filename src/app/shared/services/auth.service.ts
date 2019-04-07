import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';
import { Registration } from '../models/registration.model';
import { Authentificate } from '../models/authentificate.model';
import { tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Accept-Version': 'v1' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';
    private authUrl = 'https://pacific-plains-68381.herokuapp.com/api/auth';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('entity')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    signUp(info: Registration): Observable<Registration> {
        return this.http.post<Registration>(this.usersUrl, info, httpOptions);
    }

    signIn(info: Authentificate): Observable<Authentificate> {
        return this.http.post<Authentificate>(this.authUrl, info, httpOptions).pipe(tap(response => {
            localStorage.setItem('token', JSON.stringify(response.token));
            localStorage.setItem('entity', JSON.stringify(response.entity));
          }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('entity');
        this.currentUserSubject.next(null);
    }
}

