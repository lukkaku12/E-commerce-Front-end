import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: false,
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/dashboard/customer']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
