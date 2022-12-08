import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGuestUserComponent } from './dialog-guest-user.component';

describe('DialogGuestUserComponent', () => {
  let component: DialogGuestUserComponent;
  let fixture: ComponentFixture<DialogGuestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGuestUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGuestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
