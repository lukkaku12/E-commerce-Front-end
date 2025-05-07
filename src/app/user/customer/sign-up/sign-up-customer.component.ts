import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Response } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-sign-up-customer',
  standalone: false,
  templateUrl: './sign-up-customer.component.html',
  styleUrl: './sign-up-customer.component.css'
})
export class SignUpCustomerComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['buyer']
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
                } else if (res.user.role === 'vendor') {
                  this.router.navigate(['/dashboard/vendor']);
                }
              },
              error: (err) => console.error('Error al crear usuario:', err)
            });
    }
  }

}
