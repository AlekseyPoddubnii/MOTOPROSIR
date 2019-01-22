import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'motoprostir';

  constructor(public dialog: MatDialog) {}

  public openModal() {
    this.dialog.open(LoginComponent);
  }
}
