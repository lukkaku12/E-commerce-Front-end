import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-pending',
  standalone: false,
  templateUrl: './checkout-pending.component.html',
  styleUrl: './checkout-pending.component.css'
})
export class CheckoutPendingComponent {

  constructor(private router: Router) {}

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }

  goToOrders() {
    this.router.navigate(['/orders/your-orders']);
  }
}
