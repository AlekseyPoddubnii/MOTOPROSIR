import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';

    constructor(private http: HttpClient) {}

    signUp(info: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, info, httpOptions);
    }
}

