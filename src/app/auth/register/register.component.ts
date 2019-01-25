// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
// import { Subscription } from 'rxjs';

// import { AlertService } from '../services/alert.service';
// import { UserService } from '../services/user.service';
// import { AuthenticationService } from '../services/authentication.service';

// @Component({
//     // tslint:disable-next-line:component-selector
//     selector: 'register',
//     templateUrl: 'register.component.html',
//     styleUrls: ['register.component.scss']
// })
// export class RegisterComponent implements OnInit, OnDestroy {

//     private subscription: Subscription;
//     message: any;

//     registerForm: FormGroup;
//     submitted = false;

//     constructor(
//         private formBuilder: FormBuilder,
//         private router: Router,
//         private authenticationService: AuthenticationService,
//         private userService: UserService,
//         private alertService: AlertService
//     ) {
//         if (this.authenticationService.currentUserValue) {
//             this.router.navigate(['/']);
//         }
//     }

//     ngOnInit() {
//         this.registerForm = this.formBuilder.group({
//             username: ['', Validators.required],
//             email: ['', [Validators.required, Validators.email]],
//             firstName: ['', Validators.required],
//             lastName: ['', Validators.required],
//             brandOfBike: ['', Validators.required],
//             modelOfBike: ['', Validators.required],
//             gender: ['', Validators.required],
//             country: ['', Validators.required],
//             sity: ['', Validators.required],
//             password: ['', [Validators.required, Validators.minLength(6)]],
//             confirmedPassword: ['', [Validators.required, Validators.minLength(6)]],
//         });
//         this.subscription = this.alertService.getMessage().subscribe(message => {
//             this.message = message;
//         });
//     }

//     get f() { return this.registerForm.controls; }

//     ngOnDestroy() {
//         this.subscription.unsubscribe();
//     }

//     onSubmit() {
//         this.submitted = true;

//         if (this.registerForm.invalid) {
//             return;
//         }

//         this.userService.register(this.registerForm.value)
//             .pipe(first())
//             .subscribe(
//                 data => {
//                     this.alertService.success('Registration successful', true);
//                     this.router.navigate(['/login']);
//                 },
//                 error => {
//                     this.alertService.error(error);
//                 });
//     }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { AlertService } from '../../shared/services/alerts.servise';
import { UserService } from '../../shared/services/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        public dialog: MatDialog,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/account']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            brandOfBike: ['', Validators.required],
            modelOfBike: ['', Validators.required],
            gender: ['', Validators.required],
            country: ['', Validators.required],
            sity: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmedPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.dialog.open(LoginComponent);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public openModal() {
        this.dialog.open(LoginComponent);
    }
}
