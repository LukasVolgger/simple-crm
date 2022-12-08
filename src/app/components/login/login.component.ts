import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogGuestUserComponent } from '../dialog-guest-user/dialog-guest-user.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  /**
   * Opens the guest login dialog
   */
  openGuestUserDialog() {
    this.dialog.open(DialogGuestUserComponent);
  }

}
