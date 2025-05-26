import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-failure',
  standalone: false,
  templateUrl: './checkout-failure.component.html',
  styleUrl: './checkout-failure.component.css'
})
export class CheckoutFailureComponent {

  constructor(private router: Router) {}

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }

  goToCart() {
    this.router.navigate(['/cart/your-cart'])
  }

  goToHelp() {
    this.router.navigate(['/dashboard/customer'])
  }
}
