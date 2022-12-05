import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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
}
