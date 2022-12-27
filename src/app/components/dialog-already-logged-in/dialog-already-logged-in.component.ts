import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-already-logged-in',
  templateUrl: './dialog-already-logged-in.component.html',
  styleUrls: ['./dialog-already-logged-in.component.scss']
})
export class DialogAlreadyLoggedInComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAlreadyLoggedInComponent>,
    public authService: AuthService,
    public firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
  }

}
