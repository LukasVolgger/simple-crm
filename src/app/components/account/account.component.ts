import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to edit the user
   */
  openEditUserDialog() {
    this.dialog.open(DialogEditUserComponent);
  }

}
