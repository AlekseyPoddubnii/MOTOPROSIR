import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../../shared/models/user.model';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-acc-header',
  templateUrl: './acc-header.component.html',
  styleUrls: ['./acc-header.component.scss']
})
export class AccHeaderComponent implements OnInit {

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  currentUser: User;

    users: User[] = [];

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/index']);
    }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

}
