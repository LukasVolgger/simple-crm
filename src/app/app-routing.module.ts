import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  {
    path: 'main',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:customerId', component: CustomerDetailComponent }
    ],
    component: MainComponent, canActivate: [AuthGuard]
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
