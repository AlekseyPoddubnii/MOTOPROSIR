import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { Blog } from '../models/blog.model';
import { tap, catchError } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class BlogsService {
    blogs: Blog[];
    private blogsUrl = 'https://pacific-plains-68381.herokuapp.com/api/posts';
    private blogsUrlMy = 'https://pacific-plains-68381.herokuapp.com/api/posts/my';

    constructor(private http: HttpClient) {}
    private _refresh$ = new Subject<void>();

    get refreshBlogs$() {
        return this._refresh$;
    }

    // getBlogId(blog: Blog | number): Observable<Blog> {
    //     const id = typeof blog === 'number' ? blog : blog.id;
    //     return this.http.get<Blog>(`${this.blogsUrl}/${id}`);
    // }

    getBlogs(id): Observable<Blog[]> {
        const params = new HttpParams().set('user_id', id);
        console.log('working');
        return this.http.get<Blog[]>(this.blogsUrl, { params });
    }

    postBlogs(blog: Blog): Observable<Blog> {
        return this.http.post<Blog>(this.blogsUrl, blog, httpOptions)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    updateBlogs(updBlogs: Blog): Observable<any> {
        return this.http.put(`${this.blogsUrl}/${updBlogs.id}`, updBlogs, httpOptions)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteBlogs(blogs: Blog | number): Observable<Blog> {
        const id = typeof blogs === 'number' ? blogs : blogs.id;
        return this.http.delete<Blog>(`${this.blogsUrl}/${id}`, httpOptions);
    }

}
