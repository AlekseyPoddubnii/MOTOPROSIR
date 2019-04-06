import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Registration } from '../models/registration.model';
import { Authentificate } from '../models/authentificate.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Accept-Version': 'v1' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';
    private authUrl = 'https://pacific-plains-68381.herokuapp.com/api/auth';

    constructor(private http: HttpClient) {}

    signUp(info: Registration): Observable<Registration> {
        // const user = [{email}, {password}, {username}];
        // const userStr = JSON.stringify(user);
        return this.http.post<Registration>(this.usersUrl, info, httpOptions);
    }

    signIn(info: Authentificate): Observable<Authentificate> {
        return this.http.post<Authentificate>(this.authUrl, info, httpOptions);
    }
}

