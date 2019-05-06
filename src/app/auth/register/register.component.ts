import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AlertService } from '../../shared/services/alerts.servise';
// import { UserService } from '../../shared/services/user.service';
// import { AuthenticationService } from '../../shared/services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { MustMatch } from './match.validator';
import { ModalService } from 'src/app/shared/services/modal.service';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Registration } from 'src/app/shared/models/registration.model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    result: string;
    usersInfo: Registration;
    error: '';


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        public dialog: MatDialog,
        private matDialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public modalService: ModalService,
        private authService: AuthService,
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/account/events']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            checkbox: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        }
        );
    }

    get f() { return this.registerForm.controls; }

    onKeydown(event) {
        if (event.key === 'Enter') {
          this.onSubmit();
        }
      }

    onSubmit() {
        console.log(this.registerForm.value);

        this.usersInfo = new Registration (
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value.username,
        );
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.authService.signUp(this.usersInfo).subscribe(
            data => {
                this.modalService.close('custom-modal-2');
                this.dialog.open(LoginComponent);
                console.log('succes');
            },
            error => {
                error = JSON.stringify(error.error);
                error = error.split('"').join('');
                error = error.replace('{', '');
                error = error.replace('}', '');
                error = error.split('[').join('');
                error = error.split(']').join('');
                error = error.split(':').join(' ');
                error = error.replace(',', ', ');
                this.error = error;
                console.log(error);
            }
        );
        this.loading = true;
    }
    closeModal(id: string) {
        this.modalService.close(id);
        this.registerForm.reset();
    }

    public openModalLog() {
        this.modalService.close('custom-modal-2');
        this.dialog.open(LoginComponent);
    }
}
