import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomePage } from './home-page.model';

@Injectable()

export class HomePageService {

  eventsUrl = 'https://pacific-plains-68381.herokuapp.com/events';
  constructor(private http: HttpClient) {}

  getEvents() {
   return this.http.get<HomePage[]>(this.eventsUrl);
  }
}
