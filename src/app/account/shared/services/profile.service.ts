import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { Photo } from '../models/photo.model';




const httpOptions = {
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

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${id}`);
    }

    getUrl(file: string): Observable<any> {
        const params = new HttpParams().set('file_name', file);
        let entity: any = localStorage.getItem('entity');
        entity = JSON.parse(entity);
        const id = entity.id;
        return this.http.get(`${this.usersUrl}/${id}/presigned_url`, { params });
    }

    postPhoto(url, file) {
        console.log(file);
        return this.http.post(url, file);
    }
}
