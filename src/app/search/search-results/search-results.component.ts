import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard/dashboard.service';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { ProductResponse } from '../../dashboard/customer/interfaces/ProductResponse.interface';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  productResults: any[] = [];
  serviceResults: any[] = [];
  isLoading = false;
  queryTerm: string = '';
  searchSuggestions: any[] = [];
  showSuggestions: boolean = false;
  searchSubject = new Subject<string>();
  searchSuggestionsPopUp: any[] = [];
  showSuggestionsPopUp: boolean = false;
  searchSubjectPopUp = new Subject<string>();
  products: ProductResponse[] = [];
  services: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Primero cargamos los productos y servicios para poder hacer sugerencias locales
    Promise.all([
      this.dashboardService.getProducts().toPromise(),
      this.dashboardService.getServices().toPromise()
    ]).then(([products, services]) => {
      // cuando los obtenga de ambas promesas, los togglea como valores de propiedades que estan al alcance de otras funciones.
      this.products = products!;
      this.services = services!;
    }).catch(err => {
      console.error('Error al cargar datos para sugerencias:', err);
    });

    // Activamos las sugerencias con debounce desde la memoria local
    this.searchSubjectPopUp.pipe(
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
      this.searchSuggestionsPopUp = results;
      this.showSuggestionsPopUp = true;
    });

    // Ejecutamos búsqueda si se recibe query param
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.queryTerm = this.query;
      if (this.query) {
        this.search(this.query);
      }
    });
  }

  search(term: string) {
    this.isLoading = true;

    Promise.all([
      this.dashboardService.getProducts().toPromise(),
      this.dashboardService.getServices().toPromise()
    ]).then(([products, services]) => {
      this.productResults = products!.filter((p: any) =>
        p.base_model.toLowerCase().includes(term.toLowerCase())
      );
      this.serviceResults = services!.filter((s: any) =>
        s.service_name.toLowerCase().includes(term.toLowerCase())
      );

      this.searchSuggestions = [...this.productResults, ...this.serviceResults];

      this.isLoading = false;
    }).catch(err => {
      console.error('Error during search:', err);
      this.isLoading = false;
    });
  }


  onSearchSubmit() {
    if (this.queryTerm.trim()) {
      this.search(this.queryTerm);
    }
  }

  onInput(term: string) {
    if (term.trim().length === 0) {
      this.showSuggestionsPopUp = false;
      this.searchSuggestionsPopUp = [];
      return;
    }

    if (this.products.length > 0 || this.services.length > 0) {
      this.searchSubjectPopUp.next(term);
    }
  }

  // tengo que cambiar la logica y separar las varibles de el div del nav y las variables del div de la vista de buscar
  

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }

  goToCart() {
    this.router.navigate(['/cart/your-cart']);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  navigateToItem(item: any) {
    if (item.product_id) {
      this.router.navigate(['/product/customer/view-product', item.product_id]);
    } else if (item.service_id) {
      this.router.navigate(['/service/customer/view-service', item.service_id], {
        state: { service: item }
      });
    }
    this.showSuggestions = false;
    this.queryTerm = '';
  }
}
