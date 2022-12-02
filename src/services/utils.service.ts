import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


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
}
