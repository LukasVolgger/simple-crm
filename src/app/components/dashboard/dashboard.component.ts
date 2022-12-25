import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('customersAmount') customersAmount!: ElementRef;

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.updateCustomers();
  }

  /**
   * Calls the getAllCustomers() function and updates the template
   */
  updateCustomers() {
    this.firestoreService.getAllCustomers();

    let interval = setInterval(() => {
      if (this.firestoreService.customers != undefined) {
        clearInterval(interval);
        this.customersAmount.nativeElement.innerHTML = this.firestoreService.customers.length;
      }
    }, 1000 / 60);
  }

}
