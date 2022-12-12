import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlreadyLoggedInComponent } from './dialog-already-logged-in.component';

describe('DialogAlreadyLoggedInComponent', () => {
  let component: DialogAlreadyLoggedInComponent;
  let fixture: ComponentFixture<DialogAlreadyLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlreadyLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAlreadyLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
