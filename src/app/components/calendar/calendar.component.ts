import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  day!: string;
  date!: string;
  constructor() { }

  ngOnInit(): void {
    this.calendar();
  }


  /**
   * Calendar control
   */
  calendar() {
    const date = new Date();
    let day = date.getDay();
    this.date = date.toISOString().split('T')[0];

    switch (day) {
      case 0:
        this.day = 'SUNDAY';
        break;

      case 1:
        this.day = 'MONDAY';
        break;

      case 2:
        this.day = 'TUESDAY';
        break;

      case 3:
        this.day = 'WEDNESDAY';
        break;

      case 4:
        this.day = 'THURSDAY';
        break;

      case 5:
        this.day = 'FRIDAY';
        break;

      case 6:
        this.day = 'SATURDAY';
        break;
    }
  }
}
