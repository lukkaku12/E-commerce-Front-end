import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGatewayComponent } from './checkout-gateway/checkout-gateway.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutFailureComponent } from './checkout-failure/checkout-failure.component';
import { CheckoutPendingComponent } from './checkout-pending/checkout-pending.component';

const routes: Routes = [
  { path: '', component: CheckoutGatewayComponent },
  { path: 'success', component: CheckoutSuccessComponent },
  { path: 'failure', component: CheckoutFailureComponent },
  { path: 'pending', component: CheckoutPendingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
