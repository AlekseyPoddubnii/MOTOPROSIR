import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];

    constructor(private userService: UserService) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
