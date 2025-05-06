import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CustomerComponent } from './customer/sign-in/customer.component';
import { VendorComponent } from './vendor/sign-in/vendor.component';
import { SignUpVendorComponent } from './vendor/sign-up/sign-up-vendor.component';
import { SignUpCustomerComponent } from './customer/sign-up/sign-up-customer.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerComponent,
    VendorComponent,
    SignUpVendorComponent,
    SignUpCustomerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class UserModule { }
