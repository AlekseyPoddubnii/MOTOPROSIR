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
    private usersUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    signUp(info: User): Observable<string> {
        return this.http.post<string>(this.usersUrl, info, httpOptions);
    }
}

