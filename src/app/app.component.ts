import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from './auth/services/authentication.service';
import { User } from './auth/models/user';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'motoprostir';

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
