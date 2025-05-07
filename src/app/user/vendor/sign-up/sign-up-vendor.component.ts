import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Response } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-sign-up-vendor',
  standalone: false,
  templateUrl: './sign-up-vendor.component.html',
  styleUrl: './sign-up-vendor.component.css'
})
export class SignUpVendorComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['seller']
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.userService.createUser(this.signUpForm.value).subscribe({
        next: (res: Response) => {
          console.log('Usuario creado:', res);
          
          
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
  
          
          if (res.user.role === 'buyer') {
            this.router.navigate(['/dashboard/customer']);
          } else if (res.user.role === 'seller') {
            this.router.navigate(['/dashboard/vendor']);
          }
        },
        error: (err) => console.error('Error al crear usuario:', err)
      });
    }
  }

}
