import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  dateOfBirth: Date = new Date; // Must be initialized

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Saves the data from the form
   */
  saveUser() {
    this.user.dateOfBirth = this.dateOfBirth.getTime(); // Convert Date to unix timestamp
    console.log(this.user);
  }

}
