
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-view-product',
  standalone: false,
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  product: any;
  productId!: number;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mock directo sin llamar al servicio
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = {
      id: this.productId,
      name: 'Camiseta negra',
      description: 'Camiseta de algodón unisex, talla M',
      price: 19.99,
      stock: 12,
      vendor: {
        name: 'Tienda XYZ'
      },
      category: 'Ropa',
      images: [
        'https://placehold.co/1280x720',
        'https://via.assets.so/game.jpg?w=1280&h=720'
      ]
    };

    this.mainImage = this.product.images?.[0] ?? 'https://placehold.co/600x400?text=Sin+imagen';
    // this.productService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });
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

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }
}