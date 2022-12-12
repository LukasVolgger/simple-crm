import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss']
})
export class DialogForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogForgotPasswordComponent>
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email);
    }
  }

}
