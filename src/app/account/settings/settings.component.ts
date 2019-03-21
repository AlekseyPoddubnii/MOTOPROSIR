import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  users$: User[];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}
