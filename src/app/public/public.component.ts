import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../auth/login/login.component';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})

export class PublicComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.router.navigate(['/index']);
  }

  public openModal() {
    this.dialog.open(LoginComponent);
  }

}
