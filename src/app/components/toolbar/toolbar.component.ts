import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogUserDetailsComponent } from '../dialog-user-details/dialog-user-details.component';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens the user details dialog
   */
  openUserDetailsDialog() {
    this.dialog.open(DialogUserDetailsComponent);
  }

  /**
   * Opens a dialog to edit the user
   */
  openEditUserDialog() {
    this.dialog.open(DialogEditUserComponent);
  }

}
