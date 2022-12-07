import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public firestorageService: FirestorageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to confirm the deletion of the user
   */
  openDeleteUserDialog() {
    this.dialog.open(DialogDeleteUserComponent);
  }

}
