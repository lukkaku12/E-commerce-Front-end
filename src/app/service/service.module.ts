import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceComponent } from './vendor/create-service/create-service.component';
import { ViewVendorServiceComponent } from './vendor/view-service/view-service.component';
import { EditServiceComponent } from './vendor/edit-service/edit-service.component';
import { ServiceRoutingModule } from './service-routing.module';
import { ViewServiceComponent } from './customer/view-service/view-service.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateServiceComponent,
    ViewVendorServiceComponent,
    EditServiceComponent,
    ViewServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule
    
  ]
})
export class ServiceModule { }
