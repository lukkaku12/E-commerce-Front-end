import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-view-service',
  standalone: false,
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css'
})
export class ViewServiceComponent implements OnInit {
  service: any;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.service = navigation?.extras?.state?.['service'];
    this.mainImage = this.service?.images?.length ? this.service.images[0].url : '';
    console.log(navigation);
  
    if (this.service) {
      console.log('Servicio recibido desde state:', this.service);
    } else {
      const serviceId = Number(this.route.snapshot.paramMap.get('id'));
      console.warn('No se recibió ningún servicio. Consultando por ID:', serviceId);
      
      // Hacer fetch desde el backend
      this.serviceService.getServiceById(serviceId).subscribe(data => {
        this.service = data;
        this.mainImage = this.service?.images?.length ? this.service.images[0].url : '';
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
