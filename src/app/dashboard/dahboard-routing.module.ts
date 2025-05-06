import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'vendor', component: VendorComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}