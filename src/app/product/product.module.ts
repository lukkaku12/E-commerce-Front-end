import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './vendor/create-product/create-product.component';
import { ViewProductComponent } from './customer/view-product/view-product.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductVendorComponent } from './vendor/view-product/view-product.component';



@NgModule({
  declarations: [
    CreateProductComponent,
    ViewProductComponent,
    EditProductComponent,
    ViewProductVendorComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
