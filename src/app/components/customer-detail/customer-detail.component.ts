import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogDeleteCustomerComponent } from '../dialog-delete-customer/dialog-delete-customer.component';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customerId: any = '';

  constructor(
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public utils: UtilsService,
    public dialog: MatDialog,
  ) {
    this.getCustomerIdFromURL();
  }

  ngOnInit(): void {
  }

  /**
   * Fetches the customerId from the URL parameter and stores it in the variable customerId
   */
  getCustomerIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      this.customerId = paramMap.get('customerId');
      this.firestoreService.getCurrentCustomer(this.customerId);
      this.firestoreService.currentCustomerId = this.customerId;
    });
  }

  /**
   * Opens the edit customer dialog
   */
  openEditCustomerDialog() {
    this.dialog.open(DialogEditCustomerComponent);
    this.firestoreService.customerToEdit = new Customer(this.firestoreService.currentCustomer.customerToJSON());
  }

  /**
   * Opens the customer delete dialog
   */
  openDeleteCustomerDialog() {
    this.dialog.open(DialogDeleteCustomerComponent);
  }

}
