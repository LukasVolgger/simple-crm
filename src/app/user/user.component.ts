import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from 'src/services/firestore.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
  }

  /**
   * Opens the add user dialog
   */
  openAddUserDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  // TODO Implement open user dialog
  getRecord(row: any) {
    console.log(row);
  }

}
