import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductlayoutComponent } from './products/productlayout/productlayout.component';
import { PaymentsComponent } from './payments/payments.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { TemplatesComponent } from './templates/templates.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
      { path: 'customers', component: CustomersComponent ,canActivate:[AuthGuard]},
      { path: 'products', component: ProductlayoutComponent ,canActivate:[AuthGuard]},
      { path: 'invoices', component: InvoicesComponent ,canActivate:[AuthGuard]},
      { path: 'payments', component: PaymentsComponent ,canActivate:[AuthGuard]},
      { path: 'templates', component: TemplatesComponent,canActivate:[AuthGuard]},
      { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
