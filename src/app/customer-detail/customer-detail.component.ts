import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { FirestoreService } from 'src/services/firestore.service';
import { DialogDeleteCustomerComponent } from '../dialog-delete-customer/dialog-delete-customer.component';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  userId: any = '';

  constructor(
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public dialog: MatDialog,
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
      this.userId = paramMap.get('customerId');
      this.firestoreService.getCurrentUser(this.userId);
      this.firestoreService.currentUserId = this.userId;
    });
  }

  /**
   * Opens the edit user dialog
   * @param userId The unique document id from firestore
   */
  openEditUserDialog(userId: string) {
    console.log('Edit user:', userId);
    this.dialog.open(DialogEditCustomerComponent);
    this.firestoreService.userToEdit = new User(this.firestoreService.currentUser.userToJSON());
  }

  /**
   * Opens the user delete dialog
   * @param userId The unique document id from firestore
   */
  openDeleteUserDialog(userId: string) {
    console.log('Delete user:', userId);
    this.dialog.open(DialogDeleteCustomerComponent);
  }

}
