import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-orders',
  standalone: false,
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css',
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  queryTerm: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: any[] = [];
  services: any[] = [];
  searchSubject = new Subject<string>();

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (data) => {
        console.log(data)
        this.orders = data;
      },
      error: (err) => {
        console.error('Error al obtener órdenes:', err);
      },
    });
  }

  goToCart() {
    this.router.navigate(['/cart/your-cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders/your-orders']);
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  navigateToItem(item: any) {
    if (item.product_id) {
      this.goToProduct(item.product_id);
    } else if (item.service_id) {
      this.goToService(item.service_id);
    }
    this.showSuggestions = false;
    this.queryTerm = '';
  }

  goToProduct(id: number) {
    this.router.navigate(['/product/customer/view-product', id]);
  }
  goToService(id: number) {
    const service = this.services.find((s) => s.service_id === id);

    if (service) {
      this.router.navigate(['/service/customer/view-service', id], {
        state: { service },
      });
    } else {
      console.warn('Servicio no encontrado con ID:', id);
    }
  }

  onInput(term: string) {
    if (term.trim().length === 0) {
      this.showSuggestions = false;
      this.searchSuggestions = [];
      return;
    }

    this.searchSubject.next(term);
  }

  onSearch(event: Event) {
    event.preventDefault(); // evitar recarga del formulario
    if (this.queryTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.queryTerm.trim() },
      });
    }
  }
}
