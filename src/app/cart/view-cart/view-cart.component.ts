import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  standalone: false,
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (err) => console.error('Error fetching cart items:', err),
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/customer']);
  }

  goToProduct(productId: any) {
    console.log(productId);
    this.router.navigate(['/product/customer/view-product', productId]);
  }

  removeFromCart(cartItemId: number, event: Event) {
    event.stopPropagation();

    this.cartService.removeFromCart(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(
          (item) => item.cart_item_id !== cartItemId
        );
        this.notificationService.notifySuccess(
          'Producto eliminado del carrito'
        );
      },
      error: (err) => {
        console.error('Error al eliminar producto del carrito:', err);
      },
    });
  }

  updateQuantity(cartItemId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);

    if (isNaN(quantity) || quantity < 1) return;

    this.cartService.updateItemQuantity(cartItemId, quantity).subscribe({
      next: () => this.loadCartItems(),
      error: (err) => console.error('Error actualizando cantidad', err),
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
