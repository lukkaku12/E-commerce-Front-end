import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  products: { name: string; description: string }[] = [];
  services: { name: string; description: string }[] = [];
  cartCount = 0;
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulando endpoints
    this.products = [
      { name: 'Producto A', description: 'Descripción del producto A' },
      { name: 'Producto B', description: 'Descripción del producto B' },
      { name: 'Producto C', description: 'Descripción del producto C' },
    ];

    this.services = [
      { name: 'Servicio X', description: 'Detalle del servicio X' },
      { name: 'Servicio Y', description: 'Detalle del servicio Y' },
    ];
  }

  filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filteredServices() {
    return this.services.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
