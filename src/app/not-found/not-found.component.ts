import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ModalService } from '../shared/services/modal.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  id: number;

  constructor(
    private _location: Location,
    public dialog: MatDialog,
    public modalService: ModalService,
    ) { }

  ngOnInit() {
    if (localStorage.getItem('entity')) {
      this.id = 1;
    } else {
      this.id = 0;
    }
  }

  backClicked() {
    this._location.back();
  }

  public openModalLog() {
    this.dialog.open(LoginComponent);
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

}
