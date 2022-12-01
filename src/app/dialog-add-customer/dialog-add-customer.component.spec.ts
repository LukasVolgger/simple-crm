import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCustomerComponent } from './dialog-add-customer.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('DialogAddUserComponent', () => {
  let component: DialogAddCustomerComponent;
  let fixture: ComponentFixture<DialogAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddCustomerComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
