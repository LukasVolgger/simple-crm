import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { DialogDeleteCustomerComponent } from './dialog-delete-customer.component';

describe('DialogDeleteUserComponent', () => {
  let component: DialogDeleteCustomerComponent;
  let fixture: ComponentFixture<DialogDeleteCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteCustomerComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
