import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteUserComponent } from './dialog-delete-user.component';

describe('DialogDeleteUserComponent', () => {
  let component: DialogDeleteUserComponent;
  let fixture: ComponentFixture<DialogDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteUserComponent ]
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
