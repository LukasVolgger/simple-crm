import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';
  currentUser: User = new User;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.getUserIdFromURL();
  }

  ngOnInit(): void {
  }

  /**
   * Fetches the userId from the URL parameter and stores it in the variable userId
   */
  getUserIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('userId');

      this.getCurrentUserFromFirestore(this.userId);
    })
  }

  /**
   * Fetches the current user from the Firestore using the document id
   * @param documentId The unique document id from firestore
   */
  getCurrentUserFromFirestore(documentId: string) {
    this.firestore
      .collection('users')
      .doc(documentId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.currentUser = new User(changes);
      })
  }

  // TODO Implement function
  editCurrentUser(userId: string) {
    console.log('Edit user:', userId);
  }

  // TODO Implement function
  deleteCurrentUser(userId: string) {
    console.log('Delete user:', userId);
  }

}
