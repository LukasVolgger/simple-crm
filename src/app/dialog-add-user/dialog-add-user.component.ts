import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  constructor(public firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

}
