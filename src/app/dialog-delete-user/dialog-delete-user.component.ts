import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {
  userId: string = this.firestoreService.currentUserId;

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, public firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Redirects to the user page when a user is deleted
   */
  redirect() {
    this.dialogRef.close();
    this.router.navigateByUrl('/user');
  }
}
