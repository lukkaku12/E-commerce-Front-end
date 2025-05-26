import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-checkout-gateway',
  standalone: false,
  templateUrl: './checkout-gateway.component.html',
  styleUrl: './checkout-gateway.component.css'
})
export class CheckoutGatewayComponent {

  cartItems: any[] = [];

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al obtener ítems del carrito:', err);
      }
    });
  }

  // orderItems = [
  //   { product_name: 'Camiseta', quantity: 2, price: 20000 },
  //   { product_name: 'Zapatos', quantity: 1, price: 80000 }
  // ];

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity * item.productVariant.price, 0);
  }

  confirmCheckout(): void {
    this.checkoutService.createOrder().subscribe({
      next: (res) => {
        if (res?.success && res.link_pago) {
          window.location.href = res.link_pago;
        } else {
          this.notificationService.notifyError('No se pudo obtener el enlace de pago.')
        }
      },
      error: (err) => {
        console.error('Error de checkout:', err);
        this.notificationService.notifyError('Ocurrió un error al procesar la orden.')
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/customer']);
  }
}
