import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Producto enviado:', this.productForm.value);
      // Aquí puedes hacer la llamada a tu servicio para enviar el producto
    }
  }
}
