import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

const routes: Routes = [
  {path: 'confirm-booking', component: ConfirmBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookServiceRoutingModule { }
