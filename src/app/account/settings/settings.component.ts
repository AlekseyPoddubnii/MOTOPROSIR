import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from '../shared/services/settings.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../auth/register/match.validator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userSettings: FormGroup;
  submitted = false;
  currentUserSubscription: Subscription;
  currentUser: User;
  loading = false;
  result: string;
  userSettingsInfo: User;
  error: '';
  users$: User[];
  user$ = [];


  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private authService: AuthService,
    ) {
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }

  ngOnInit() {
    this.userSettings = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      lastPassword: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmNewPassword: ['', Validators.required],
    }, {
      // validator: MustMatch('newPassword', 'confirmNewPassword')
    }
    );
    this.settingsService.refreshBlogs$.
    subscribe(() => {
      this.getAllUsers();
    });

    this.getAllUsers();
  }

  resetSettings() {
    this.userSettings.reset();
    //   this.blogsCreateForm.setErrors(null);
  }

  private getAllUsers() {
    this.settingsService.getUser().
    subscribe(res => this.users$ = this.user$[0] = res);
  }

  get f() { return this.userSettings.controls; }


  onSubmit() {
    console.log(this.userSettings.value);

    this.userSettingsInfo = new User (
        this.userSettings.value.email,
        this.userSettings.value.newPassword,
        this.userSettings.value.username,
        this.userSettings.value.firstName,
        this.userSettings.value.lastName,
        this.userSettings.value.gender,
        this.userSettings.value.country,
        this.userSettings.value.city,
        this.userSettings.value.avatar,
        this.userSettings.value.cover,
    );
    this.submitted = true;

    if (this.userSettings.invalid) {
        return;
    }

    this.loading = true;
  }

  save(user: User): void {
    this.settingsService.updateUser(user).subscribe();
  }
}

