import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { CustomersComponent } from './customers.component';

describe('UserComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersComponent],
      imports: [
        MatDialogModule
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
