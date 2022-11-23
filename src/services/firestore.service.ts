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

  constructor(private firestore: AngularFirestore) { }

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
}
