import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HomePageService {
  constructor(private http: HttpClient) {}

  getEvents() {
   return this.http.get('http://localhost:3000/events');
  }
}
