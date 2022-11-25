import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { DialogEditUserComponent } from './dialog-edit-user.component';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditUserComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
