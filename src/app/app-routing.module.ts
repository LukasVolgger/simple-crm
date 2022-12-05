import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  // { path: "", component: DashboardComponent },
  // { path: "dashboard", component: DashboardComponent },
  // { path: "customers", component: CustomersComponent },
  // { path: "customers/:customerId", component: CustomerDetailComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'dashboard',
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:customerId', component: CustomerDetailComponent }
    ],
    component: DashboardComponent, canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
