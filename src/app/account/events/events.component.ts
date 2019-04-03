import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Events } from './events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [EventsService]
})
export class EventsComponent implements OnInit {

  events$: Events[];


  constructor(
    private EventsService: EventsService
  ) {

  }

  ngOnInit() {
    return this.EventsService.getEvents().
    subscribe(data => this.events$ = data);
  }

}
