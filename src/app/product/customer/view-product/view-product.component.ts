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
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/customer']);
  }

  addToCart(): void {
    // Aquí podrías usar un servicio de carrito para agregar el producto
    
    alert('Producto agregado al carrito');
  }
  
  buyNow(): void {
    // Aquí podrías redirigir a la página de checkout o compra directa
    this.router.navigate(['/checkout'], { state: { product: this.product } });
  }
}