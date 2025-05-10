import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  products: { name: string; description: string }[] = [];
  services: { name: string; description: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.products = [
      { name: 'Producto 1', description: 'Descripción del producto 1' },
      { name: 'Producto 2', description: 'Descripción del producto 2' },
    ];

    this.services = [
      { name: 'Servicio A', description: 'Disponible los lunes y miércoles' },
    ];
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
    this.router.navigate(['product/vendor/create-service']);
  }

  addAvailability() {
    this.router.navigate(['/vendor/disponibilidad']);
  }
}
