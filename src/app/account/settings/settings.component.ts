import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../shared/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  users$: User[];
  users: User;

  constructor(
    private settingsService: SettingsService,
    ) { }

  ngOnInit() {
    this.settingsService.refreshUser$.
    subscribe(() => {
      this.getAllSettings();
    });

    this.getAllSettings();
  }

  private getAllSettings() {
    this.settingsService.getUser().
    subscribe(data => this.users$ = data);
  }
}
