import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ProductVariant } from './interfaces/variant.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private location: Location) {
    this.productForm = this.fb.group({
      gtin: ['', [Validators.required]],
      mpn: ['', [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      base_model: ['', Validators.required],
      variantes: this.fb.array([])
    });
  }

  get variantes(): FormArray {
    return this.productForm.get('variantes') as FormArray;
  }

  get variantControls() {
    return (this.productForm.get('variantes') as FormArray).controls;
  }

  // Método para crear una variante vacía
  private createVariant(): FormGroup {
    return this.fb.group({
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required]
    });
  }

  // Agrega una nueva variante
  addVariant() {
    this.variantes.push(this.createVariant());
  }

  // Elimina una variante por índice
  removeVariant(index: number) {
    this.variantes.removeAt(index);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const { variantes, ...productData } = this.productForm.value;

      const userData = localStorage.getItem('user') || '';
      const userId = JSON.parse(userData)

      productData.seller_id = userId

      this.productService.createProduct(productData).subscribe({
        next: (createdProduct) => {
          console.log(createdProduct)
          const productId = createdProduct.product_id; //product_id

          const variantesConProductoId: ProductVariant[] = variantes.map((v: ProductVariant) => ({
            ...v,
            product_id: productId
          }));
          console.log(variantesConProductoId)

          this.productService.createVariants(variantesConProductoId).subscribe({
            next: () => {
              console.log('Producto y variantes creados con éxito');
              this.router.navigate(['/dashboard/vendor'])
            },
            error: (err: any) => {
              this.errorMessage = 'Error al crear las variantes. Por favor intenta nuevamente.';
            }
          });
        },
        error: (err: any) => {
          this.errorMessage = 'Error al crear el producto. Verifica los datos ingresados.';
        }
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  goBack() {
    this.location.back();
  }
}
