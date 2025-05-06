import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(
    private router: Router
  ) {}
  

  onClientClick() {
    this.router.navigate(['user/signup-client'])
  }

  onVendorClick() {
    this.router.navigate(['user/signup-vendor'])
  }

}
