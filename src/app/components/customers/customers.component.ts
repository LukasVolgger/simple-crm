import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  dataSource!: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];

  constructor(
    public dialog: MatDialog,
    public firestoreService: FirestoreService,
    private router: Router,
    public utils: UtilsService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.firestoreService.customers);
    this.dataSource.paginator = this.paginator;
    console.log('Customers from Service: ', this.firestoreService.customers);
    console.log('Table Data Source: ', this.dataSource);
    // FIXME The table is empty after refreshing the page
    // TODO Update dataSource after adding, update and delete customers
  }

  /**
   * Opens the add customer dialog
   */
  openAddCustomerDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }

  /**
   * Redirects to customer/customerId
   * @param customerId The unique firebase document id
   */
  openCustomerDetails(customerId: string) {
    this.router.navigateByUrl('main/customers/' + customerId);
  }

}
