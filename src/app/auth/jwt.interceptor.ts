import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        const currentUser = this.authService.currentUserValue;
        if (currentUser && localStorage.getItem('token')) {
            token = JSON.parse(token);
            req = req.clone({
                setHeaders: {
                Authorization: token
                }
            });
        }
        return next.handle(req);
    }
}
