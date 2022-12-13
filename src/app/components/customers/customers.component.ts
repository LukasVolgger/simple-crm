import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  dataSource!: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth'];
  noData: boolean = false;

  constructor(
    public dialog: MatDialog,
    public firestoreService: FirestoreService,
    private router: Router,
    public utils: UtilsService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateTableData();

  }

  /**
   * Subscribes the observable from the firestore and assigns each change to the variable dataSource
   */
  updateTableData() {
    this.firestoreService.getAllCustomersSnapshot();

    this.firestoreService.customersDataSource.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.displayNoDataMessage();
    });
  }

  /**
   * Shows the user a message when no data is available
   */
  displayNoDataMessage() {
    if (this.dataSource['_data']['_value'].length < 1) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  /**
   * Filters the dataSource from the table
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
