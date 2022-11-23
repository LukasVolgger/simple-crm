import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user: User = new User();
  dateOfBirth: Date = new Date; // Must be initialized
  loading: boolean = false;
  users: any;

  constructor(private firestore: AngularFirestore) {
    this.getFromFirestore();
  }

  /**
   * CRUD => CREATE
   * Saves the user in the Firestore as JSON
   * 1. Converts the date into a unix timestamp
   * 2. Converts the user object into JSON
   */
  addToFirestore() {
    this.loading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();

    this.firestore
      .collection('users')
      .add(this.user.userToJSON())
      .then((result) => {
        this.loading = false;
        console.log(result);
      })
  }

  /**
 * CRUD => READ
 * 1. Gets the data from the users collection
 * 2. Updates the local variable users
 */
  getFromFirestore() {
    // this.loading = true; 
    // TODO Activate loading while fetching data

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.users = changes;
        console.log(this.users);
      });

  }
}
