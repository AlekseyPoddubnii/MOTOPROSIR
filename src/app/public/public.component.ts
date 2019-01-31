import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../auth/login/login.component';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})

export class PublicComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public modalService: ModalService,
    ) {}

  ngOnInit() {
    this.router.navigate(['/index']);
  }

  public openModalLog() {
    this.dialog.open(LoginComponent);
  }

  openModal(id: string) {
      this.modalService.open(id);
    }

}
