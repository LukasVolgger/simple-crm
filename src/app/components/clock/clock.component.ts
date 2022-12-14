import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  inc = 1000;
  hours!: number;
  minutes!: number;
  seconds!: number;

  constructor() { }

  ngOnInit(): void {
    this.clock();
    setInterval(this.clock, this.inc);
  }

  /**
   * Clock control
   */
  clock() {
    const date = new Date();

    this.hours = ((date.getHours() + 11) % 12 + 1);
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    const hour = this.hours * 30;
    const minute = this.minutes * 6;
    const second = this.seconds * 6;

    if (document.getElementById('hour')) {
      document.getElementById('hour')!.style.transform = `rotate(${hour}deg)`;
      document.getElementById('hour-digital')!.innerHTML = `${this.hours.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`;
    }

    if (document.getElementById('minute')) {
      document.getElementById('minute')!.style.transform = `rotate(${minute}deg)`;
      document.getElementById('minute-digital')!.innerHTML = `${this.minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`;
    }

    if (document.getElementById('second')) {
      document.getElementById('second')!.style.transform = `rotate(${second}deg)`;
      document.getElementById('second-digital')!.innerHTML = `${this.seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`;
    }
  }
}
