import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit {
  customerId: string = this.firestoreService.currentCustomerId;

  constructor(public dialogRef: MatDialogRef<DialogEditCustomerComponent>, public firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
  }

  /**
   * Help function to simulate a short loading time
   */
  editUser() {
    this.firestoreService.updateCustomer(this.customerId);
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

}
