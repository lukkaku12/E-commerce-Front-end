import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  products: { name: string; description: string, id: number }[] = [];
  services: { name: string; description: string, id: number  }[] = [];
  cartCount = 0;
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulando endpoints
    this.products = [
      { name: 'Producto A', description: 'Descripción del producto A', id: 1  },
      { name: 'Producto B', description: 'Descripción del producto B', id: 2  },
      { name: 'Producto C', description: 'Descripción del producto C', id: 3 },
    ];

    this.services = [
      { name: 'Servicio X', description: 'Detalle del servicio X', id: 5 },
      { name: 'Servicio Y', description: 'Detalle del servicio Y', id: 7 },
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

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }
  goToProduct(id: number) {
    this.router.navigate(['/product/customer/view-product', id]);
  }
}
