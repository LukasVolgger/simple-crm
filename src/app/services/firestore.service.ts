import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../models/customer.class';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  customerToAdd: Customer = new Customer();
  customerToEdit: Customer = new Customer();
  dateOfBirth: Date = new Date; // Must be initialized
  customers: any;
  currentCustomer: Customer = new Customer();
  currentCustomerId: string = '';

  allUsers: any;

  loading: boolean = false;

  constructor(private firestore: AngularFirestore) {
    this.getAllCustomers();
  }

  /**
   * CRUD => CREATE
   * Saves the customer in the Firestore as JSON
   * 1. Converts the date into a unix timestamp
   * 2. Converts the customer object into JSON
   */
  addCustomer() {
    this.loading = true;
    this.customerToAdd.dateOfBirth = this.dateOfBirth.getTime();

    this.firestore
      .collection('customers')
      .add(this.customerToAdd.customerToJSON())
      .then((result) => {
        this.loading = false;
        console.log(result);
      })

    this.customerToAdd = new Customer(); // Clear ngModel in template form
  }

  /**
   * CRUD => READ
   * 1. Gets the data from the customers collection
   * 2. Updates the local variable customers
   */
  getAllCustomers() {
    // this.loading = true; 
    // TODO Activate loading while fetching data

    this.firestore
      .collection('customers')
      .valueChanges({ idField: 'customerId' })
      .subscribe((changes: any) => {
        this.customers = changes;
      });
  }

  /**
   * CRUD => UPDATE
   * Updates the passed customer in the Firestore
   * @param customerId The unique document id from firestore
   */
  updateCustomer(customerId: string) {
    this.loading = true;

    this.firestore
      .collection('customers')
      .doc(customerId)
      .update(this.customerToEdit.customerToJSON())
      .then((result) => {
        this.loading = false;
        console.log(result);
      })
  }

  /**
   * CRUD => DELETE
   * Deletes a customer from the Firestore
   * @param customerId The unique document id from firestore
   */
  deleteCustomer(customerId: string) {
    this.loading = true;

    this.firestore
      .collection('customers')
      .doc(customerId)
      .delete()
      .then((result) => {
        this.loading = false;
        console.log(result);
      })
  }

  /**
   * Fetches the current customer from Firestore using the document id
   * @param documentId The unique document id from firestore
   */
  getCurrentCustomer(documentId: string) {
    this.firestore
      .collection('customers')
      .doc(documentId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.currentCustomer = new Customer(changes);
      })
  }

  /**
   * CRUD => READ
   * 1. Gets the data from the users collection
   * 2. Updates the local variable allUsers
   */
  getAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }
}
