import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit {
  editCustomerForm!: FormGroup;
  customerId: string = this.firestoreService.currentCustomerId;

  constructor(
    public dialogRef: MatDialogRef<DialogEditCustomerComponent>,
    public firestoreService: FirestoreService,
    private fb: FormBuilder,
    private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.editCustomerForm = this.fb.group({
      firstName: [this.firestoreService.currentCustomer.firstName, Validators.required],
      lastName: [this.firestoreService.currentCustomer.lastName, Validators.required],
      dateOfBirth: [this.utils.getDateFromTimestamp(this.firestoreService.currentCustomer.dateOfBirth), Validators.required],
      phoneNumber: [this.firestoreService.currentCustomer.phoneNumber, Validators.required],
      email: [this.firestoreService.currentCustomer.email, [Validators.required, Validators.email]],
      website: [this.firestoreService.currentCustomer.website],
      street: [this.firestoreService.currentCustomer.street, Validators.required],
      zipCode: [this.firestoreService.currentCustomer.zipCode, Validators.required],
      city: [this.firestoreService.currentCustomer.city, Validators.required],
      country: [this.firestoreService.currentCustomer.country, Validators.required],
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.editCustomerForm.valid) {
      this.firestoreService.customerToEdit.firstName = this.editCustomerForm.value.firstName;
      this.firestoreService.customerToEdit.lastName = this.editCustomerForm.value.lastName;
      this.firestoreService.customerToEdit.dateOfBirth = this.utils.getUnixTimestamp(this.editCustomerForm.value.dateOfBirth);
      this.firestoreService.customerToEdit.phoneNumber = this.editCustomerForm.value.phoneNumber;
      this.firestoreService.customerToEdit.email = this.editCustomerForm.value.email;
      this.firestoreService.customerToEdit.website = this.editCustomerForm.value.website || 'No website';
      this.firestoreService.customerToEdit.street = this.editCustomerForm.value.street;
      this.firestoreService.customerToEdit.zipCode = this.editCustomerForm.value.zipCode;
      this.firestoreService.customerToEdit.city = this.editCustomerForm.value.city;
      this.firestoreService.customerToEdit.country = this.editCustomerForm.value.country;

      this.firestoreService.updateCustomer(this.customerId);
      this.dialogRef.close();
    }
  }

}
