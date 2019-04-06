import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// import { AuthenticationService } from '../../shared/services/authentication.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Authentificate } from 'src/app/shared/models/authentificate.model';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    loginInfo: Authentificate;

    constructor(
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<LoginComponent>,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        // private authenticationService: AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public modalService: ModalService,
    ) {
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/account']);
        // }
     }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        // this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/events';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log(this.loginForm.value);

        this.loginInfo = new Authentificate (
            this.loginForm.value.email,
            this.loginForm.value.password,
        );

        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.signIn(this.loginInfo)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.matDialogRef.close();
                },
                error => {
                    this.error = error;
                });


        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //             this.matDialogRef.close();
        //         },
        //         error => {
        //             this.error = error;
        //         });
    }

    public close() {
        this.matDialogRef.close();
    }

    openModal(id: string) {
        this.matDialogRef.close();
        this.modalService.open(id);
    }
}
