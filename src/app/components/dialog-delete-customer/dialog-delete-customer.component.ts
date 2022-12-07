import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';



@Component({
  selector: 'app-dialog-delete-customer',
  templateUrl: './dialog-delete-customer.component.html',
  styleUrls: ['./dialog-delete-customer.component.scss']
})
export class DialogDeleteCustomerComponent implements OnInit {
  customerId: string = this.firestoreService.currentCustomerId;

  constructor(public dialogRef: MatDialogRef<DialogDeleteCustomerComponent>, public firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Help function to simulate a short loading time
   */
  deleteCustomer() {
    this.firestoreService.deleteCustomer(this.customerId);

    setTimeout(() => {
      this.redirect();
    }, 500);
  }

  /**
   * Redirects to the customers page when a customer is deleted
   */
  redirect() {
    this.dialogRef.close();
    this.router.navigateByUrl('main/customers');
  }
}
