import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { tap } from 'rxjs/operators';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'image/*' })
};

const httpOptionsApi = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private usersUrl = 'https://pacific-plains-68381.herokuapp.com/api/users';

    constructor(
        private http: HttpClient,
    ) {}

    contentType: string;

    private _refresh$ = new Subject<void>();

    get refreshUser$() {
        return this._refresh$;
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${id}`);
    }

    getUrl(file: string): Observable<any> {
        const params = new HttpParams().set('file_name', file);
        // const contentType = new HttpParams().set('Content-Type', 'image/jpeg');
        let entity: any = localStorage.getItem('entity');
        entity = JSON.parse(entity);
        const id = entity.id;
        return this.http.get(`${this.usersUrl}/${id}/presigned_url`, { params });
    }

    postAvatar(url, file): Observable<any> {
        console.log(file);
        return this.http.put(url, file);
    }

    putAvatar(avatar: User): Observable<User> {
        let entity: any = localStorage.getItem('entity');
        entity = JSON.parse(entity);
        const id = entity.id;
        return this.http.put<User>(`${this.usersUrl}/${id}`, avatar, httpOptionsApi)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    putCover(avatar: User): Observable<User> {
        let entity: any = localStorage.getItem('entity');
        entity = JSON.parse(entity);
        const id = entity.id;
        return this.http.put<User>(`${this.usersUrl}/${id}`, avatar, httpOptionsApi)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }


}
