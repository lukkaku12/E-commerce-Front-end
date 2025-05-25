
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { NotificationService } from '../../../services/notification.service';

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
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Mock directo sin llamar al servicio
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    // this.product = {
    //   id: this.productId,
    //   category: 'Ropa',
    //   gtin: '1234567890123',
    //   mpn: 'CAM-001-BLK',
    //   brand: 'MarcaX',
    //   base_model: 'ModeloX',
    //   seller_id: 42,
    //   images: [
    //     'https://placehold.co/1280x720',
    //     'https://via.assets.so/game.jpg?w=1280&h=720'
    //   ]
    // };

   
    this.productService.getProductById(this.productId).subscribe(data => {
      console.log(data)
      this.product = data;
      this.product.images = [
            'https://placehold.co/1280x720',
            'https://via.assets.so/game.jpg?w=1280&h=720'
          ]
      this.mainImage = this.product.images[0] ?? 'https://placehold.co/600x400?text=Sin+imagen';
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/customer']);
  }

  goToCart() {
    this.router.navigate(['/cart/your-cart'])
  }

  addToCart(): void {
    this.productService.addToCart(this.product.id).subscribe({
      next: () => this.notificationService.notifySuccess('Producto agregado al carrito'),
      error: () => this.notificationService.notifyError('No se pudo agregar al carrito'),
    });
  }
  
  buyNow(): void {
    // Aquí podrías redirigir a la página de checkout o compra directa
    this.router.navigate(['/checkout'], { state: { product: this.product } });
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard/customer']);
  }
}