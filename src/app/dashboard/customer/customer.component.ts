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
  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getProducts().subscribe({
      next: (data) => {
        console.log(data)
        this.products = data;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });

    this.dashboardService.getServices().subscribe({
      next: (data) => {
        console.log(data)
        this.services = data;
      },
      error: (err) => {
        console.error('Error cargando servicios', err);
      }
    });
  }

  filteredProducts() {
    return this.products.filter(p =>
      p.base_model.toLowerCase().includes(this.searchTerm.toLowerCase())
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
}
