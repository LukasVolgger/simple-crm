import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-guest-user',
  templateUrl: './dialog-guest-user.component.html',
  styleUrls: ['./dialog-guest-user.component.scss']
})
export class DialogGuestUserComponent implements OnInit {
  guestLoginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<DialogGuestUserComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.guestLoginForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.guestLoginForm.valid) {
      this.authService.guestLogin(this.guestLoginForm.value.displayName); this.dialogRef.close()
    }
  }

}
