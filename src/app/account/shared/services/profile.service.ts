import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';

    constructor(private http: HttpClient) {}

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${id}`);
    }
}
