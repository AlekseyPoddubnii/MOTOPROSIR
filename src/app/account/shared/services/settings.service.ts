import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { tap, catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    users: User[];
    private user = localStorage.getItem('currentUser');
    private usersUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    private _refresh$ = new Subject<void>();

    get refreshUser$() {
        return this._refresh$;
    }

    getUser(): Observable<User[]> {
        const userParsed = JSON.parse(this.user);
        return this.http.get<User[]>(`${this.usersUrl}/${userParsed.id}`);
    }

    updateUser(updBlogs: User): Observable<any> {
        return this.http.put(`${this.usersUrl}/${updBlogs.id}`, updBlogs, httpOptions)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }
}
