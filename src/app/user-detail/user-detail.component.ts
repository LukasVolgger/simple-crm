import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';

  constructor(private route: ActivatedRoute, public firestoreService: FirestoreService) {
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

      this.firestoreService.getCurrentUser(this.userId);
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
