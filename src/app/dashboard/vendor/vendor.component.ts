import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Service } from './interfaces/service.interface';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit {
  products: any[] = [];
  services: Service[] = [];

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {

    this.loadProducts();
    this.loadServices()
  }

  loadProducts() {
    return this.dashboardService.getProducts().subscribe({
      next: (data) => {
        console.log('📦 Productos:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
      }
    })
  }

  loadServices() {
    return this.dashboardService.getServices().subscribe({
      next: (data) => {
        console.log('📦 Servicios:', data);
        this.services = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar servicios:', err);
      }
    })
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  createProduct() {
    this.router.navigate(['/product/vendor/create-product']);
  }

  createService() {
    this.router.navigate(['service/vendor/create-service']);
  }

  goToProduct(id: number) {
    this.router.navigate(['/product/vendor/view-product', id]);
  }

  goToService(id: number) {
    this.router.navigate(['/service/vendor/view-service', id]);
  }
}
