import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { DialogDeleteUserComponent } from './dialog-delete-user.component';

describe('DialogDeleteUserComponent', () => {
  let component: DialogDeleteUserComponent;
  let fixture: ComponentFixture<DialogDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteUserComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
