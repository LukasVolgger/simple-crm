import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    public authService: AuthService,
    public utils: UtilsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
  * Submits a form
  */
  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.displayName, this.signUpForm.value.email, this.signUpForm.value.password);
    }
  }

}
