import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { ProductResponse } from './interfaces/ProductResponse.interface';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

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
  queryTerm: string = '';
  searchSubject = new Subject<string>();
  searchSuggestions: any[] = [];
  showSuggestions = false;

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
    // hacer flujos de esta logica, para entender deeper.
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        const products = this.products.filter(p =>
          p.base_model.toLowerCase().includes(term.toLowerCase())
        );
        const services = this.services.filter(s =>
          s.service_name.toLowerCase().includes(term.toLowerCase())
        );
        return of([...products, ...services]);
      })
    ).subscribe(results => {
      this.searchSuggestions = results;
      this.showSuggestions = true;
    });
  }

  onInput(term: string) {
    if (term.trim().length === 0) {
      this.showSuggestions = false;
      this.searchSuggestions = [];
      return;
    }

    this.searchSubject.next(term);
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

  goToOrders() {
    this.router.navigate(['/orders/your-orders'])
  }

  addToCart(product_id: number) {
    this.dashboardService.addToCart(product_id).subscribe({
      next: () => this.notificationService.notifySuccess('added to cart'),
      error: () => this.notificationService.notifyError('not added to cart')
    })
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

  onSearch(event: Event) {
  event.preventDefault(); // evitar recarga del formulario
  if (this.queryTerm.trim()) {
    this.router.navigate(['/search'], { queryParams: { query: this.queryTerm.trim() } });
  }
}
}
