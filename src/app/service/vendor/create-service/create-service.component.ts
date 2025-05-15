import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ServiceSchedule } from './interfaces/service-schedule.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-service',
  standalone: false,
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css',
})
export class CreateServiceComponent {
  errorMessage = '';
  service = {
    service_name: '',
    service_description: '',
    service_price: 0,
    seller_id: 0,
  };

  serviceSchedules: ServiceSchedule[] = [
    {
      schedule_date: '',
      start_time: '',
      ending_time: '',
      isAvailable: true,
      service_id: 0, // Placeholder, will be updated dynamically so linter does not bother
    },
  ];

  constructor(
    private servicesService: ServiceService,
    private router: Router,
    private location: Location
  ) {}

  addSchedule() {
    this.serviceSchedules.push({
      schedule_date: '',
      start_time: '',
      ending_time: '',
      isAvailable: true,
    });
  }

  removeSchedule(index: number) {
    this.serviceSchedules = this.serviceSchedules.filter(
      (scheduleObject, scheduleIndex) => scheduleIndex !== index
    );
  }

  submitService() {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const seller_id = parsedUser?.user_id;

    if (
      this.service.service_description &&
      this.service.service_name &&
      this.service.service_price &&
      seller_id
    ) {
      this.service.seller_id = seller_id;

      this.servicesService.createService(this.service).subscribe({
        next: (createdService) => {
          console.log(createdService, 'servicio');
          const serviceId = createdService.service_id;
          console.log(serviceId, 'id');
          const serviceSchedules: ServiceSchedule[] = this.serviceSchedules.map(
            (s) => ({
              ...s,
              service_id: serviceId,
            })
          );
          console.log(serviceSchedules);

          this.servicesService
            .createServiceSchedules(serviceSchedules)
            .subscribe({
              next: () => {
                console.log('Producto y variantes creados con éxito');
                this.router.navigate(['/dashboard/vendor']);
              },
              error: (err: any) => {
                this.errorMessage =
                  'Error al crear las schedules del servicio. Por favor intenta nuevamente.';
              },
            });
        },
        error: (err: any) => {
          this.errorMessage =
            'Error al crear el servicio. Verifica los datos ingresados.';
        },
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  goBack() {
    this.location.back();
  }
}
