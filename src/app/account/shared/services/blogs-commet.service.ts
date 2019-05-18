import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { Blog } from '../models/blog.model';
import { tap, catchError } from 'rxjs/operators';
import { BlogComment } from '../models/comment.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})
export class BlogsCommentService {
    comments: BlogComment[];
    private commentsUrl = 'https://pacific-plains-68381.herokuapp.com/api/comments';
    private blogsUrl = 'https://pacific-plains-68381.herokuapp.com/api/posts';

    constructor(private http: HttpClient) {}
    private _refresh$ = new Subject<void>();

    get refreshComments$() {
        return this._refresh$;
    }

    postComment(id, commentBody): Observable<any> {
        console.log('Post Comment', id, commentBody);
        return this.http.put<any>(this.commentsUrl, {
            'commentable_type': 'Blog',
            'commentable_id': id,
        }, commentBody);
    }

    getComments(id): Observable<BlogComment[]> {
        return this.http.get<BlogComment[]>(`${this.blogsUrl}/${id}/comments`);
    }
}
