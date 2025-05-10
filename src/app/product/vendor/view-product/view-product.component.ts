import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  standalone: false
})
export class ViewProductVendorComponent implements OnInit {
  product: any;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
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

    this.loadProduct()
  }

  mainImage: string = '';

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.mainImage = res.images?.[0] ?? 'https://placehold.co/600x400?text=Sin+imagen';;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.router.navigate(['/dashboard/vendor']);
      }
    });
  }

  goToEdit(): void {
    this.router.navigate(['product/vendor/edit-product', this.product.id]);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/vendor']);
  }
}