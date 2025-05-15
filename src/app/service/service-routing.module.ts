
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewServiceComponent } from './customer/view-service/view-service.component';
import { ViewVendorServiceComponent } from './vendor/view-service/view-service.component';
import { EditServiceComponent } from './vendor/edit-service/edit-service.component';
import { CreateServiceComponent } from './vendor/create-service/create-service.component';

const routes: Routes = [
  { path: 'customer/view-service/:id', component: ViewServiceComponent},
  { path: 'vendor/view-service/:id', component: ViewVendorServiceComponent},
  { path: 'vendor/create-service', component: CreateServiceComponent},
  { path: 'vendor/edit-service/:id', component: EditServiceComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}