import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAuthErrorsComponent } from './dialog-auth-errors.component';

describe('DialogAuthErrorsComponent', () => {
  let component: DialogAuthErrorsComponent;
  let fixture: ComponentFixture<DialogAuthErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAuthErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAuthErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
