import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot ) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/index']);
        return false;
    }
}
