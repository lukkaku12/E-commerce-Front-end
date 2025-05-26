import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookServiceRoutingModule } from './book-service-routing.module';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';


@NgModule({
  declarations: [
    ConfirmBookingComponent
  ],
  imports: [
    CommonModule,
    BookServiceRoutingModule
  ]
})
export class BookServiceModule { }
