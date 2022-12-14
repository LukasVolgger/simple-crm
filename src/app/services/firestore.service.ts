import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer.class';
import { User } from '../models/user.class';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  customerToAdd: Customer = new Customer();
  customerToEdit: Customer = new Customer();
  customers!: Array<any>;
  customersDataSource!: Observable<any>;
  currentCustomer: Customer = new Customer();
  currentCustomerId: string = '';
  allUsers: any;
  userDataObject!: User;

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
    private utils: UtilsService
  ) {
    this.getAllCustomers();
    this.deleteOldGuestUsers(86400000); // Delete old guest users from firestore after 1 day
  }

  /**
   * CRUD => CREATE
   * Saves the customer in the Firestore as JSON
   * 1. Converts the date into a unix timestamp
   * 2. Converts the customer object into JSON
   */
  addCustomer() {
    this.utils.loading = true;

    this.firestore
      .collection('customers')
      .add(this.customerToAdd.customerToJSON())
      .then(() => {
        this.utils.loading = false;
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
    this.utils.loading = true;

    this.firestore
      .collection('customers')
      .doc(customerId)
      .update(this.customerToEdit.customerToJSON())
      .then(() => {
        this.utils.loading = false;
      });
  }

  /**
   * CRUD => DELETE
   * Deletes a customer from the Firestore
   * @param customerId The unique document id from firestore
   */
  deleteCustomer(customerId: string) {
    this.utils.loading = true;

    this.firestore
      .collection('customers')
      .doc(customerId)
      .delete()
      .then(() => {
        this.utils.loading = false;
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
    this.utils.loading = true;

    const authService = this.injector.get(AuthService);
    this.userDataObject = new User(authService.userData); // Convert observable into object

    this.firestore
      .collection('users')
      .doc(uid)
      .update(this.userDataObject.userToJSON())
      .then(() => {
        this.utils.loading = false;
      });
  }

  /**
   * Deletes the user from the firestore based on the passed user id
   * @param uid The document id from the 'users' collection
   */
  deleteUser(uid: string) {
    this.utils.loading = true;

    this.firestore.collection('users')
      .doc(uid)
      .delete()
      .then(() => {
        this.utils.loading = false;
      });
  }

  /**
   * Deletes old guest users from firestore
   * This deletes from FIRESTORE ONLY, not auth API
   * 1 month = 2629743833.3
   * 1 week = 604800000
   * 1 day (d) = 86400000
   * 1 hours (h) = 3600000
   * 1 minutes (m) = 60000
   * @param time time in milliseconds
   */
  deleteOldGuestUsers(time: number) {
    let timestampNow: number = Date.now();

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user) => {
        user.forEach((element: any) => {
          if ((timestampNow - element['createdAt']) > time && element.isAnonymous) {
            this.deleteUser(element.uid);
          };
        })
      });
  }
}
