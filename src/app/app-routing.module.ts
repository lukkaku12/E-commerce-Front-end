import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
  path: 'search',
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
  path: 'orders',
  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
  path: 'checkout',
  loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
  path: 'book-service',
  loadChildren: () => import('./book-service/book-service.module').then(m => m.BookServiceModule)
  },
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
