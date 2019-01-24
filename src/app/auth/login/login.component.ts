import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<LoginComponent>,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    get f() { return this.loginForm.controls; }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

    }

    public close() {
          this.matDialogRef.close();
        }
}
