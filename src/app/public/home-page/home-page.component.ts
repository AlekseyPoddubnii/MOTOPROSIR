import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  events = [
    {
      title: 'Crazy run',
      type: 1,
      days: 20,
      date: "12.09.11"
    },
    {
      title: 'Lazy run',
      type: 1,
      days: 20,
      date: "12.09.11"
    },
    {
      title: 'Чика Чика, Вероника',
      type: 4,
      days: 20,
      date: "12.09.11"
    },
    {
      title: 'Бетман Бенедиктович',
      type: 3,
      days: 20,
      date: "12.09.11"
    },
    {
      title: 'Ран Вася Ран',
      type: 4,
      days: 20,
      date: "12.09.11"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
