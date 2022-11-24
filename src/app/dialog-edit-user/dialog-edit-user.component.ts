import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  userId: string = this.firestoreService.currentUserId;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, public firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
  }

  /**
   * Help function to simulate a short loading time
   */
  editUser() {
    this.firestoreService.updateUser(this.userId);
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

}
