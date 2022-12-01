import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-delete-customer',
  templateUrl: './dialog-delete-customer.component.html',
  styleUrls: ['./dialog-delete-customer.component.scss']
})
export class DialogDeleteCustomerComponent implements OnInit {
  userId: string = this.firestoreService.currentUserId;

  constructor(public dialogRef: MatDialogRef<DialogDeleteCustomerComponent>, public firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Help function to simulate a short loading time
   */
  deleteUser() {
    this.firestoreService.deleteUser(this.userId);

    setTimeout(() => {
      this.redirect();
    }, 500);
  }

  /**
   * Redirects to the user page when a user is deleted
   */
  redirect() {
    this.dialogRef.close();
    this.router.navigateByUrl('/customers');
  }
}
