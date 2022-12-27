import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loading: boolean = false;

  constructor(private router: Router) { }


  /**
   * Converts a unix timestamp to a date in the format MM/DD/YYYY
   * @param unixTimestamp the unix timestamp as param
   * @returns String date MM/DD/YYYY
   */
  convertTimestampToDate(unixTimestamp: number) {
    let date = new Date(unixTimestamp);
    let formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    return formattedDate;
  }

  /**
   * Redirects to the login page and reloads the page once
   * Is necessary to avoid login problems
   */
  redirectToLogin() {
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  /**
   * Redirects to the customers page
   */
  redirectToCustomers() {
    this.router.navigate(['main/customers']);
  }

  /**
   * Converts a date to a unix timestamp
   * @param date The date object from the date picker
   * @returns Unix timestamp
   */
  getUnixTimestamp(date: Date) {
    let timestamp = new Date(date).getTime();
    return timestamp;
  }

  /**
   * Converts a unix timestamp into a date object
   * @param timestamp Unix timestamp
   * @returns Date object
   */
  getDateFromTimestamp(timestamp: number) {
    let date = new Date(timestamp);
    return date;
  }
}
