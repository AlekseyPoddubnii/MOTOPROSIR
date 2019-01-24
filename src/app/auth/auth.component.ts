import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
  })

export class AuthComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog,
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    public openModal() {
        this.dialog.open(LoginComponent);
    }
}
