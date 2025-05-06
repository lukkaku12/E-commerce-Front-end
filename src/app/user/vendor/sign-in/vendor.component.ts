import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { Response } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.createUser(this.signInForm.value).subscribe({
              next: (res: Response) => {
                console.log('Usuario creado:', res);
                
                
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('user', JSON.stringify(res.user));
        
                
                if (res.user.role === 'buyer') {
                  this.router.navigate(['/client/dashboard']);
                } else if (res.user.role === 'vendor') {
                  this.router.navigate(['/vendor/dashboard']);
                }
              },
              error: (err) => console.error('Error al crear usuario:', err)
            });
    }
  }
}
