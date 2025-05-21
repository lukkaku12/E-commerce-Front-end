import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { ProductResponse } from './interfaces/ProductResponse.interface';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  products: ProductResponse[] = [];
  services: any[] = [];
  cartCount = 0;
  searchTerm: string = '';
  constructor(private router: Router, private dashboardService: DashboardService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.dashboardService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });

    this.dashboardService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.error('Error cargando servicios', err);
      }
    });
  }

  filteredProducts() {
  return this.products.filter(p =>
    p.base_model.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
    p.product_variants && p.product_variants.length > 0
  );
}

  filteredServices() {
    return this.services.filter(s =>
      s.service_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }
  goToProduct(id: number) {
    this.router.navigate(['/product/customer/view-product', id]);
  }
  goToService(id: number) {
    const service = this.services.find(s => s.service_id === id);
  
    if (service) {
      this.router.navigate(['/service/customer/view-service', id], {
        state: { service }
      });
    } else {
      console.warn('Servicio no encontrado con ID:', id);
    }
  }

  goToCart() {
    this.router.navigate(['/cart/your-cart'])
  }

  addToCart(product_id: number) {
    this.dashboardService.addToCart(product_id).subscribe({
      next: () => this.notificationService.notifySuccess('added to cart'),
      error: () => this.notificationService.notifyError('not added to cart')
    })
  }
}
