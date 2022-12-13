import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-user-details',
  templateUrl: './dialog-user-details.component.html',
  styleUrls: ['./dialog-user-details.component.scss']
})
export class DialogUserDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUserDetailsComponent>,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
