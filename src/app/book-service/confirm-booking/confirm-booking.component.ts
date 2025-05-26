import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookServiceService } from '../book-service.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-confirm-booking',
  standalone: false,
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.css'
})
export class ConfirmBookingComponent {
  service: any;
  schedule: any;

  constructor(private router: Router, private location: Location, private bookService: BookServiceService, private notificationService: NotificationService) {
    const state = this.location.getState() as { service: any; schedule: any };
    this.service = state.service;
    this.schedule = state.schedule;
  }

  confirmBooking(): void {
    const bookingData = {
      scheduleId: this.schedule?.id,
    };

    this.bookService.createBooking(bookingData).subscribe({
      next: (res) => {
        if (res?.message && res.paymentLink) {
          window.location.href = res.paymentLink;
        } else {
          this.notificationService.notifyError('No se pudo obtener el enlace de pago.')
        }
        // Redirigir o mostrar mensaje de éxito
      },
      error: (err) => {
        console.error('Error al realizar la reserva:', err);
        this.notificationService.notifyError('Error al realizar la reserva.')
      }
    });
  }
}
