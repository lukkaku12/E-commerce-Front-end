import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpVendorComponent } from './vendor/sign-up/sign-up-vendor.component';
import { SignUpCustomerComponent } from './customer/sign-up/sign-up-customer.component';
import { VendorComponent } from './vendor/sign-in/vendor.component';
import { CustomerComponent } from './customer/sign-in/customer.component';

const routes: Routes = [
  { path: 'signup-client', component: SignUpCustomerComponent },
  { path: 'signup-vendor', component: SignUpVendorComponent },
  { path: 'sign-in-client', component: CustomerComponent },
  { path: 'sign-in-vendor', component: VendorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}