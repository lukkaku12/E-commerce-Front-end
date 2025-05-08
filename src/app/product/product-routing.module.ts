import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './customer/view-product/view-product.component';
import { CreateProductComponent } from './vendor/create-product/create-product.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { ViewProductVendorComponent } from './vendor/view-product/view-product.component';

const routes: Routes = [
  { path: 'customer/view-product/:id', component: ViewProductComponent},
  { path: 'vendor/create-product', component: CreateProductComponent},
  { path: 'vendor/edit-product/:id', component: EditProductComponent},
  { path: 'vendor/view-product/:id', component: ViewProductVendorComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}