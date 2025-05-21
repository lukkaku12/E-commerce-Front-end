import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  standalone: false,
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {this.cartItems = data; console.log('product items brought')},
      error: (err) => console.error('Error fetching cart items:', err)
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/customer']);
  }
}
