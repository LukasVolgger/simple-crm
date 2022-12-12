import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-already-logged-in',
  templateUrl: './dialog-already-logged-in.component.html',
  styleUrls: ['./dialog-already-logged-in.component.scss']
})
export class DialogAlreadyLoggedInComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAlreadyLoggedInComponent>) { }

  ngOnInit(): void {
  }

}
