import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import { HomePage } from './home-page.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [HomePageService]
})
export class HomePageComponent implements OnInit {

  events$: HomePage[];

  constructor(private homePageService: HomePageService) { }

  ngOnInit() {
    return this.homePageService.getEvents().
    subscribe(data => this.events$ = data)
  }

}
