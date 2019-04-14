import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { tap, catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    users: User;
    private user = localStorage.getItem('entity');
    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';

    constructor(private http: HttpClient) {}

    private _refresh$ = new Subject<void>();

    get refreshBlogs$() {
        return this._refresh$;
    }

    getUser(): Observable<User[]> {
        const userParsed = JSON.parse(this.user);
        return this.http.get<User[]>(`${this.usersUrl}/${userParsed.id}`);
    }


    // getUser(): Observable<User> {
    //     console.log('idet');
    //     const userParsed = JSON.parse(this.user);
    //     return this.http.get<User>(`${this.usersUrl}/${userParsed.id}`);
    // }

    updateUser(userSettings: User): Observable<User> {
        console.log('tyt');
        const userParsed = JSON.parse(this.user);
        return this.http.put<User>(`${this.usersUrl}/${userParsed.id}`, userSettings, httpOptions)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }
}
