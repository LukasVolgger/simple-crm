import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserDetailsComponent } from './dialog-user-details.component';

describe('DialogUserDetailsComponent', () => {
  let component: DialogUserDetailsComponent;
  let fixture: ComponentFixture<DialogUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
