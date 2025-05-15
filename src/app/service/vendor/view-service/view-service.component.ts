import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { Service } from '../create-service/interfaces/service.interface';

@Component({
  selector: 'app-view-service',
  standalone: false,
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css'
})
export class ViewVendorServiceComponent implements OnInit {
  service: Service | null = null;
  serviceId!: number;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getServiceById(this.serviceId).subscribe(data => {
      console.log(data)
      this.service = data;
      this.mainImage = 'https://placehold.co/400x300?text=Servicio';
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/vendor']);
  }
}
