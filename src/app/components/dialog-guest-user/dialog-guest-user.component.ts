import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-guest-user',
  templateUrl: './dialog-guest-user.component.html',
  styleUrls: ['./dialog-guest-user.component.scss']
})
export class DialogGuestUserComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<DialogGuestUserComponent>
  ) { }

  ngOnInit(): void {
  }

}
