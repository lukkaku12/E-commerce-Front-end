import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutGatewayComponent } from './checkout-gateway/checkout-gateway.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutFailureComponent } from './checkout-failure/checkout-failure.component';
import { CheckoutPendingComponent } from './checkout-pending/checkout-pending.component';


@NgModule({
  declarations: [
    CheckoutGatewayComponent,
    CheckoutSuccessComponent,
    CheckoutFailureComponent,
    CheckoutPendingComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
