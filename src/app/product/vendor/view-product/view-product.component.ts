import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: any;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.router.navigate(['/vendedor/dashboard']);
      }
    });
  }

  goToEdit(): void {
    this.router.navigate(['/vendedor/editar-producto', this.product.id]);
  }

  goBack(): void {
    this.router.navigate(['/vendedor/dashboard']);
  }
}