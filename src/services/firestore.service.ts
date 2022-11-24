import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userToAdd: User = new User();
  dateOfBirth: Date = new Date; // Must be initialized
  users: any;
  currentUser: User = new User;
  currentUserId: string = '';

  loading: boolean = false;

  constructor(private firestore: AngularFirestore) {
    this.getAllUsers();
  }

  /**
   * CRUD => CREATE
   * Saves the user in the Firestore as JSON
   * 1. Converts the date into a unix timestamp
   * 2. Converts the user object into JSON
   */
  addUser() {
    this.loading = true;
    this.userToAdd.dateOfBirth = this.dateOfBirth.getTime();

    this.firestore
      .collection('users')
      .add(this.userToAdd.userToJSON())
      .then((result) => {
        this.loading = false;
        console.log(result);
      })

    this.userToAdd = new User; // Clear ngModel in template form
  }

  /**
   * CRUD => READ
   * 1. Gets the data from the users collection
   * 2. Updates the local variable users
   */
  getAllUsers() {
    // this.loading = true; 
    // TODO Activate loading while fetching data

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
        console.log(this.users);
      });
  }

  /**
   * CRUD => UPDATE
   * Updates the passed user in the Firestore
   */
  updateUser(userId: string) {
    this.loading = true;

    this.firestore
      .collection('users')
      .doc(userId)
      .update(this.currentUser.userToJSON())
      .then((result) => {
        this.loading = false;
        console.log(result);
      })
  }

  /**
   * CRUD => DELETE
   * Deletes a user from the Firestore
   */
  deleteUser(userId: string) {
    this.loading = true;

    this.firestore
      .collection('users')
      .doc(userId)
      .delete()
      .then((result) => {
        this.loading = false;
        console.log(result);
      })
  }

  /**
   * Fetches the current user from Firestore using the document id
   * @param documentId The unique document id from firestore
   */
  getCurrentUser(documentId: string) {
    this.firestore
      .collection('users')
      .doc(documentId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.currentUser = new User(changes);
      })
  }
}
