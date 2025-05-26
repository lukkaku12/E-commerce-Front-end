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
  selectedSchedule: any = null;

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

  selectSchedule(schedule: any): void {
    this.selectedSchedule = schedule;
  }

  bookSelectedSchedule(): void {
    if (!this.selectedSchedule) return;

    console.log('Reservando:', this.selectedSchedule);
    // Aquí podrías redirigir a una ruta de confirmación o llamar a un servicio
    this.router.navigate(['/book-service/confirm-booking'], {
      state: { schedule: this.selectedSchedule, service: this.service }
    });
  }
}
