import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import { HomePage } from './home-page.model';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MatDialog } from '@angular/material';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [HomePageService]
})
export class HomePageComponent implements OnInit {

  events$: HomePage[];

  constructor(
    private homePageService: HomePageService,
    public dialog: MatDialog,
    public modalService: ModalService,
    ) { }

  ngOnInit() {
    return this.homePageService.getEvents().
    subscribe(data => this.events$ = data);
  }

  public openModalLog() {
    this.dialog.open(LoginComponent);
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

}
