import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer.class';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  customerToAdd: Customer = new Customer();
  customerToEdit: Customer = new Customer();
  dateOfBirth: Date = new Date; // Must be initialized
  customers!: Array<any>;
  customersDataSource!: Observable<any>;
  currentCustomer: Customer = new Customer();
  currentCustomerId: string = '';

  allUsers: any;
  userData: any; // Gets the data from auth service
  userDataObject!: User;

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

    this.firestore
      .collection('customers')
      .add(this.customerToAdd.customerToJSON())
      .then(() => {
        this.loading = false;
      });

    this.customerToAdd = new Customer();
  }

  /**
   * CRUD => READ
   * 1. Gets the data from the customers collection
   * 2. Updates the local variable customers
   */
  getAllCustomers() {
    this.firestore
      .collection('customers')
      .valueChanges({ idField: 'customerId' })
      .subscribe((changes: any) => {
        this.customers = changes;
      });
  }

  /**
   * Assigns an observable with the snapshot of all customers to the variable customersDataSource
   * Needed for the MatTableDataSource
   * The field "id" is only created for opening a customer in the table
   */
  getAllCustomersSnapshot() {
    this.customersDataSource = this.firestore.collection('customers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
      .then(() => {
        this.loading = false;
      });
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
      .then(() => {
        this.loading = false;
      });
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
      });
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

  /**
   * Updates the current user in the firestore
   * Possible changes: displayName || photoURL
   * @param uid The document id from the 'users' collection
   */
  updateUser(uid: string) {
    this.userDataObject = new User(this.userData); // Convert observable into object
    this.firestore
      .collection('users')
      .doc(uid)
      .update(this.userDataObject.userToJSON());
  }

  /**
   * Deletes the user from the firestore based on the passed user id
   * @param uid The document id from the 'users' collection
   */
  deleteUser(uid: string) {
    this.firestore.collection('users')
      .doc(uid)
      .delete();
  }
}
