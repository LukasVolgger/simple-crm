import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent implements OnInit {

  constructor(public firestoreService: FirestoreService, public dialogRef: MatDialogRef<DialogAddCustomerComponent>) { }

  ngOnInit(): void {
  }

}
