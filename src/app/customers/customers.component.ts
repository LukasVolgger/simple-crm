import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';
import { UtilsService } from 'src/services/utils.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService, private router: Router, public utils: UtilsService) {
  }

  ngOnInit(): void {
  }

  /**
   * Opens the add customer dialog
   */
  openAddCustomerDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }

  /**
   * Redirects to customer/customerId
   * @param customerId The unique firebase document id
   */
  openCustomerDetails(customerId: string) {
    this.router.navigateByUrl('customers/' + customerId)
  }

}
