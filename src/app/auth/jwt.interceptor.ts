import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req, next) {
        let token = localStorage.getItem('token');
        token = JSON.parse(token);
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(tokenizedReq);
    }
}
