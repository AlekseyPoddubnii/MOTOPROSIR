import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private matDialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  public close() {
    this.matDialogRef.close();
  }

}
