import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService, private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Opens the add user dialog
   */
  openAddUserDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }

  /**
   * Redirects to user/userId
   * @param userId The unique firebase document id
   */
  openUserDetails(userId: string) {
    this.router.navigateByUrl('customers/' + userId)
  }

}
