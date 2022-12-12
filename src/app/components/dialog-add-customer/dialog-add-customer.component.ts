import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;

  constructor(
    public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>,
    private fb: FormBuilder,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.addCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.addCustomerForm.valid) {
      this.firestoreService.customerToAdd.firstName = this.addCustomerForm.value.firstName;
      this.firestoreService.customerToAdd.lastName = this.addCustomerForm.value.lastName;
      this.firestoreService.customerToAdd.dateOfBirth = this.utils.getUnixTimestamp(this.addCustomerForm.value.dateOfBirth);
      this.firestoreService.customerToAdd.phoneNumber = this.addCustomerForm.value.phoneNumber;
      this.firestoreService.customerToAdd.email = this.addCustomerForm.value.email;
      this.firestoreService.customerToAdd.website = this.addCustomerForm.value.website || '-';
      this.firestoreService.customerToAdd.street = this.addCustomerForm.value.street;
      this.firestoreService.customerToAdd.zipCode = this.addCustomerForm.value.zipCode;
      this.firestoreService.customerToAdd.city = this.addCustomerForm.value.city;
      this.firestoreService.customerToAdd.country = this.addCustomerForm.value.country;

      this.firestoreService.addCustomer();
      this.dialogRef.close();
    }
  }

}
