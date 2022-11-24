import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService, private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Opens the add user dialog
   */
  openAddUserDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  /**
   * Redirects to user/userId
   * @param userId The unique firebase document id
   */
  openUserDetails(userId: string) {
    this.router.navigateByUrl('user/' + userId)
  }

}
