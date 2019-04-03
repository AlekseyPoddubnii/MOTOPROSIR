import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../shared/models/event.model';

@Injectable()
export class EventsService {

  eventsUrl = 'http://localhost:3000/events';
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<Events[]>(this.eventsUrl);
   }
}
