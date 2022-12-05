import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailAdressComponent } from './verify-email-adress.component';

describe('VerifyEmailAdressComponent', () => {
  let component: VerifyEmailAdressComponent;
  let fixture: ComponentFixture<VerifyEmailAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailAdressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmailAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
