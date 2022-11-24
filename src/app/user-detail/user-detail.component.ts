import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';

  constructor(
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {
    this.getUserIdFromURL();
  }

  ngOnInit(): void {
  }

  /**
   * Fetches the userId from the URL parameter and stores it in the variable userId
   */
  getUserIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('userId');
      this.firestoreService.getCurrentUser(this.userId);
    })
  }

  /**
   * Opens the edit user dialog
   * @param userId The unique document id from firestore
   */
  openEditUserDialog(userId: string) {
    console.log('Edit user:', userId);
    this.dialog.open(DialogEditUserComponent);
  }

  /**
   * Opens the user delete dialog
   * @param userId The unique document id from firestore
   */
  openDeleteUserDialog(userId: string) {
    console.log('Delete user:', userId);
    this.dialog.open(DialogDeleteUserComponent);
  }

}
